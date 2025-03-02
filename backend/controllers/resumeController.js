const pdf = require("pdf-parse");
const axios = require("axios");
const { encrypt, decrypt } = require("../utils/encryptDecrypt");
const Applicant = require("../models/Applicant");
const { setCache, getCache } = require("../utils/cache");

exports.extractResumeData = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "PDF URL is required." });

    const cacheKey = `resume:${url}`;
    const cachedData = await getCache(cacheKey);
    if (cachedData) {
      console.log("Cache hit! Returning cached resume data.");
      return res.status(200).json(cachedData);
    }

    const response = await axios.get(url, { responseType: "arraybuffer" });
    const pdfText = await pdf(response.data);

    if (!pdfText.text || pdfText.text.trim().length === 0) {
      return res.status(500).json({ error: "Failed to extract text from PDF." });
    }

    const prompt = `Extract and structure this resume data into JSON format.
    Ensure the output follows this exact schema:
    {
    "name": "<Full Name>",
    "email": "<Email>",
    "education": {
        "degree": "<Degree or 'N/A'>",
        "branch": "<Branch or 'N/A'>",
        "institution": "<Institution Name or 'N/A'>",
        "year": "<Graduation Year or 'N/A'>"
    },
    "experience": {
        "job_title": "<Job Title or 'N/A'>",
        "company": "<Company Name or 'N/A'>",
        "start_date": "<YYYY-MM-DD or 'N/A'>",
        "end_date": "<YYYY-MM-DD or 'N/A'>"
    },
    "skills": ["<Skill_1>", "<Skill_2>", "<Skill_3>", ...],
    "summary": "<Brief candidate profile summary or 'N/A'>"
    }
    - If any field is missing, fill it with 'N/A'.
    - Use 'N/A' instead of leaving fields empty.
    - Do NOT include Markdown (\`\`\`json). Return raw JSON only.

    Resume Content:
    ${pdfText.text}`;

    const geminiResponse = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: { "Content-Type": "application/json" },
        params: { key: process.env.GEMINI_API_KEY },
      }
    );

    if (!geminiResponse.data || !geminiResponse.data.candidates) {
      return res.status(500).json({ error: "Failed to process resume data with LLM." });
    }

    let responseText = geminiResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!responseText) {
      return res.status(500).json({ error: "LLM response is empty or invalid." });
    }

    responseText = responseText.replace(/```json|```/g, "").trim();

    let parsedData;
    try {
      parsedData = JSON.parse(responseText);
    } catch (error) {
      console.error("JSON Parsing Error:", error);
      return res.status(500).json({ error: "Failed to parse LLM response." });
    }

    parsedData.name = parsedData.name || "N/A";
    parsedData.email = parsedData.email || "N/A";
    parsedData.education = parsedData.education || {};
    parsedData.education.degree = parsedData.education.degree || "N/A";
    parsedData.education.branch = parsedData.education.branch || "N/A";
    parsedData.education.institution = parsedData.education.institution || "N/A";
    parsedData.education.year = parsedData.education.year || "N/A";

    parsedData.experience = parsedData.experience || {};
    parsedData.experience.job_title = parsedData.experience.job_title || "N/A";
    parsedData.experience.company = parsedData.experience.company || "N/A";
    parsedData.experience.start_date = parsedData.experience.start_date || "N/A";
    parsedData.experience.end_date = parsedData.experience.end_date || "N/A";

    parsedData.skills = parsedData.skills || [];
    parsedData.summary = parsedData.summary || "N/A";

    parsedData.name = encrypt(parsedData.name);
    parsedData.email = encrypt(parsedData.email);

    const applicant = new Applicant(parsedData);
    await applicant.save();

    const decryptedData = {
      ...parsedData,
      name: decrypt(parsedData.name),
      email: decrypt(parsedData.email)
    };

    await setCache(cacheKey, decryptedData, 600);

    res.status(200).json(decryptedData);
  } catch (error) {
    console.error("Resume Processing Error:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

exports.searchResume = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required." });

    const cacheKey = `search:${name.toLowerCase()}`;
    const cachedResults = await getCache(cacheKey);
    if (cachedResults) {
      console.log("Cache hit! Returning cached search results.");
      return res.status(200).json(cachedResults);
    }

    const regex = new RegExp(name, "i"); 
    const applicants = await Applicant.find({});

    const matchingApplicants = applicants.filter(applicant => {
      const decryptedName = decrypt(applicant.name);
      return regex.test(decryptedName);
    });

    if (matchingApplicants.length === 0) {
      return res.status(404).json({ error: "No matching resumes found." });
    }

    const response = matchingApplicants.map(applicant => ({
      _id: applicant._id,
      name: decrypt(applicant.name),
      email: decrypt(applicant.email),
      education: applicant.education,
      experience: applicant.experience,
      skills: applicant.skills,
      summary: applicant.summary,
      createdAt: applicant.createdAt
    }));

    await setCache(cacheKey, response, 300);

    res.status(200).json(response);
  } catch (error) {
    console.error("Resume Search Error:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

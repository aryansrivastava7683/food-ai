

const { GoogleGenerativeAI } =require('@google/generative-ai');
export async function geminiRes(foodName) {

    
    const Aikey = 'AIzaSyCcK0-4-NgrEc9vJOpE2Y3Is_eA___jNB8';

    const genAI = new GoogleGenerativeAI(Aikey);
   
    

    const prePrompt = `Tell me the ingredients of ${foodName}. What's the taste of it and what do we eat with it usually ,in under 30 words`;
    

     try {
         const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
         const result = await model.generateContent(prePrompt);
         return result.response.text().trim();
     } catch (error) {
         console.error("Error generating content:", error);
         return `I couldn't find any information on ${foodName}. Please try another one.`;
     }
 }

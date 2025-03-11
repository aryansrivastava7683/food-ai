export async function POST(req) {
    try {
      const formData = await req.formData(); // Parse incoming form data
  
      const backendResponse = await fetch("http://134.209.159.121:8000/predict/", {
        method: "POST",
        body: formData,
      });
  
      const data = await backendResponse.json();
      return new Response(JSON.stringify(data), {
        status: backendResponse.status,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Proxy Error:", error);
      return new Response(JSON.stringify({ error: "Internal Server Error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
  
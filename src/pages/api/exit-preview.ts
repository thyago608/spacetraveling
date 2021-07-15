export default async (_, res) => {
    res.clearPreviewData();
  
    res.writeHead(307, { Location: "http://localhost:3000/api/exit-preview"});
    res.end();
  };
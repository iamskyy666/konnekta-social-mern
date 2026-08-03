// mw that extracts the id
async function protectMw(req, res, next) {
  try {
    const { userId } = await req.auth();
    if (!userId) {
      return res.json({ success: false, message: "🔴 Not Authenticated!" });
    }
    next();
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return res.json({ success: false, message: err.message });
  }
}

export default protectMw;

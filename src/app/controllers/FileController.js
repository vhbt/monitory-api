class FileController {
  async store(req, res) {
    const { filename } = req.file;

    const path = `/files/uploads/${filename}`;

    return res.json({ path });
  }
}

export default new FileController();

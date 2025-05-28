const { response } = require("express");
const db = require("../config/db");

// Lấy danh sách các lỗi
const getAllBugReports = (req, res) => {
  const sql = "SELECT * FROM bug_reports";
  db.query(sql, (err, result) => {
    if (err)
      return res.status(500).json({ message: "Lỗi truy vấn bug_reports" });
    res.json(result);
  });
};

const getBugReportById = (req, res) => {
  const reportId = req.params.report_id;
  const sql = "SELECT * FROM bug_reports WHERE report_id = ?";
  db.query(sql, [reportId], (err, result) => {
    if (err)
      return res.status(500).json({ message: "Lỗi truy vấn chi tiết lỗi" });
    if (result.length === 0)
      return res.status(404).json({ message: "Không tìm thấy lỗi" });
    res.json(result); // Trả về object lỗi duy nhất
  });
};

const updateStutus = (req, res) => {
  const reportId = req.params.report_id;
  const sql = "UPDATE bug_reports SET status = 'resolved', updated_at = NOW() WHERE report_id = ?";
  db.query(sql, [reportId], (err, result) => {
    if (err) return res.status(500).json({ message: 'Lỗi cập nhật trạng thái' });
    res.json({ message: 'Cập nhật trạng thái thành công' });
  });
}

// Gửi phản hồi đến lỗi
// const responseToBug = (req, res) => {
//   const { report_id, response_text, technician_id } = req.body;
//   const sql =
//     "INSERT INTO bug_responses (bug_id, response_text, technician_id) VALUES (?, ?, ?)";
//   db.query(sql, [report_id, response_text, technician_id], (err, result) => {
//     if (err) return res.status(500).json({ message: "Lỗi khi gửi phản hồi" });
//     res.json({ message: "Phản hồi đã được gửi thành công" });
//   });
// };

const getResponseByBugId = (req, res) => {
  const reportId = req.params.report_id;
  const sql = `
    SELECT br.response_text, br.response_date AS response_time
    FROM bug_responses br
    WHERE br.report_id = ?
  `;
  db.query(sql, [reportId], (err, result) => {
    if (err) {
      console.error("Lỗi truy vấn phản hồi:", err);
      return res.status(500).json({ message: "Lỗi khi lấy phản hồi." });
    }
    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).json({ message: "Không tìm thấy phản hồi cho lỗi này." });
    }
  });
};

const postResponseToBug = (req, res) => {
  const { report_id, response_text } = req.body;
  const sqlInsertResponse = `
    INSERT INTO bug_responses (report_id, response_text, response_date)
    VALUES (?, ?, NOW())
  `;
  db.query(sqlInsertResponse, [report_id, response_text], (err, result) => {
    if (err) {
      console.error("Lỗi khi chèn phản hồi:", err);
      return res.status(500).json({ message: "Lỗi khi lưu phản hồi." });
    }

    // Sau khi lưu phản hồi thành công, cập nhật trạng thái của bug report
    const sqlUpdateReport = `
      UPDATE bug_reports
      SET status = 'resolved', updated_at = NOW()
      WHERE report_id = ?
    `;
    db.query(sqlUpdateReport, [report_id], (errUpdate) => {
      if (errUpdate) {
        console.error("Lỗi khi cập nhật trạng thái lỗi:", errUpdate);
        return res.status(500).json({ message: "Lỗi khi cập nhật trạng thái lỗi." });
      }
      res.json({ message: "Phản hồi đã được gửi và trạng thái lỗi đã được cập nhật." });
    });
  });
};  

module.exports = {
  getAllBugReports,
  // responseToBug,
  updateStutus,
  getBugReportById,
  getResponseByBugId,
  postResponseToBug
};
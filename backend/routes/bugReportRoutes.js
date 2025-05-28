const express = require('express');
const router = express.Router();
const bugController = require('../controllers/bugReportController');

// GET danh sách lỗi
router.get('/api/bugs', bugController.getAllBugReports);

router.get('/api/bugs/:report_id', bugController.getBugReportById);

router.put('/api/bugs/:report_id/resolve', bugController.updateStutus);

// POST phản hồi lỗi
// router.post('/api/bugs/details', bugController.responseToBug);

router.get('/api/responses/:report_id', bugController.getResponseByBugId);

router.post('/api/response', bugController.postResponseToBug);

module.exports = router;
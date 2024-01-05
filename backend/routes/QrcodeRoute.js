const express = require("express");
const {
  getAllQrcodes,
  createQrcode,
  updateQrcode,
  deleteQrcode,
  getSingleQrcode,
  getAdminQrcodes
  

} = require("../controller/QrcodeController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/qrcodes").get(getAllQrcodes);

router
  .route("/admin/qrcodes")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminQrcodes);

router
  .route("/qrcode/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createQrcode);

router
  .route("/qrcode/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateQrcode)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteQrcode)
  .get(getSingleQrcode);

module.exports = router;

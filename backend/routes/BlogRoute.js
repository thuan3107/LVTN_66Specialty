const express = require("express");
const {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  getSingleBlog,
  createBlogReview,
  getSingleBlogReviews,
  deleteReview,
  getAdminBlogs,
} = require("../controller/BlogController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/blogs").get(getAllBlogs);

router
  .route("/admin/blogs")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminBlogs);

router
  .route("/blog/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createBlog);

router
  .route("/blog/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateBlog)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteBlog)
  .get(getSingleBlog);

router.route("/blog/review").post(isAuthenticatedUser, createBlogReview);

router
  .route("/reviews")
  .get(getSingleBlogReviews)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteReview);

module.exports = router;

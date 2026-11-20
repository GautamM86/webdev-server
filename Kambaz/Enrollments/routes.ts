import EnrollmentsDao from "./dao";
export default function EnrollmentRoutes(app, db) {
  const dao = EnrollmentsDao(db);
  const resolveUserId = (req, res) => {
    let { uid } = req.params;
    if (uid === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return null;
      }
      uid = currentUser._id;
    }
    return uid;
  };
  const findAllEnrollments = (req, res) => {
    res.json(dao.findAllEnrollments());
  };
  const enrollUserInCourse = (req, res) => {
    const uid = resolveUserId(req, res);
    if (!uid) return;
    dao.enrollUserInCourse(uid, req.params.cid);
    res.sendStatus(200);
  };
  const unenrollUserFromCourse = (req, res) => {
    const uid = resolveUserId(req, res);
    if (!uid) return;
    dao.unenrollUserFromCourse(uid, req.params.cid);
    res.sendStatus(200);
  };
  app.get("/api/enrollments", findAllEnrollments);
  app.post("/api/users/:uid/courses/:cid", enrollUserInCourse);
  app.delete("/api/users/:uid/courses/:cid", unenrollUserFromCourse);
}
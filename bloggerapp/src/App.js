import "./App.css";
import BookDetails from "./BookDetails";
import BlogDetails from "./BlogDetails";
import CourseDetails from "./CourseDetails";

function App() {

  const showCourse = true;
  const showBook = true;
  const showBlog = true;

  return (
      <div className="container">

        {showCourse && (
            <div className="column">
              <CourseDetails />
            </div>
        )}

        {showBook ? (
            <div className="column">
              <BookDetails />
            </div>
        ) : null}

        {showBlog ? (
            <div className="column">
              <BlogDetails />
            </div>
        ) : null}

      </div>
  );
}

export default App;
import React, { useState, useContext, useEffect } from "react";
import { ImgurifyContext } from "../context/ImgurifyContext";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import SideBar from "../SideBar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [newTag, setNewTag] = useState("");
  const [tags, setTags] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const { userID } = useContext(ImgurifyContext);

  useEffect(() => {
    fetch("http://localhost:3007/tag")
      .then((response) => response.json())
      .then((fetchedTags) => setTags(fetchedTags))
      .catch((error) => console.error("Error fetching tags:", error));
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "selectedTag":
        setSelectedTag(value);
        setNewTag("");
        break;
      case "newTag":
        setNewTag(value);
        break;
      case "image":
        setImageFile(event.target.files[0]);
        setImagePreview(URL.createObjectURL(event.target.files[0]));
        break;
      default:
        break;
    }
  };

  const validateImage = (file) => {
    const supportedTypes = ["image/jpeg", "image/png"];
    return supportedTypes.includes(file.type);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!imageFile) {
      console.error("Please select an image file");
      return;
    }

    if (!validateImage(imageFile)) {
      console.error("Invalid image format. Only JPEG and PNG allowed");
      return;
    }

    try {
      let tagData;

      if (selectedTag === "new") {
        const response = await fetch("http://localhost:3007/tag", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: newTag }),
        });
        const newTagData = await response.json();
        tagData = { _id: newTagData._id, name: newTag };
      } else {
        const selectedTagData = JSON.parse(selectedTag);
        tagData = { _id: selectedTagData._id, name: selectedTagData.name }; // Include both ID and name
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("tag", JSON.stringify(tagData)); // Send both ID and name
      formData.append("image", imageFile);
      formData.append("user", userID);

      const response = await fetch("http://localhost:3007/post", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log("Post created successfully:", data);
      toast.success("Post created successfully");

      setTitle("");
      setDescription("");
      setSelectedTag("");
      setNewTag("");
      setImageFile(null);
      setImagePreview("");
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Error creating post:");
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md={2}>
          <SideBar />
        </Col>
        <Col md={10} className="bg-deems">
          <Container fluid style={{ paddingTop: "20px" }}>
            <h2 className="signin-1 text-center">Create a Post</h2>
            <form onSubmit={handleSubmit} className="create-post-form">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control title"
                  id="title"
                  name="title"
                  placeholder="Add a post title"
                  value={title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group mt-2">
                <textarea
                  className="form-control description"
                  id="description"
                  name="description"
                  placeholder="Add a description"
                  rows="2"
                  value={description}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <select
                  className="form-control tags"
                  id="selectedTag"
                  name="selectedTag"
                  value={selectedTag}
                  onChange={handleInputChange}
                  style={{ marginTop: "10px", marginBottom: "10px" }}
                >
                  <option value="" disabled>
                    Select or Create Tag
                  </option>
                  {tags.map((tag) => (
                    <option key={tag._id} value={JSON.stringify(tag)}>
                      {tag.name}
                    </option>
                  ))}
                  <option value="new">Create New Tag</option>
                </select>
                {selectedTag === "new" && (
                  <div className="mt-2">
                    <input
                      type="text"
                      className="form-control tags"
                      id="newTag"
                      name="newTag"
                      value={newTag}
                      onChange={handleInputChange}
                      placeholder="Enter New Tag Name"
                      required
                    />
                  </div>
                )}
              </div>

              <div className="form-group mt-3">
                <label htmlFor="image">Image</label>
                <input
                  type="file"
                  className="form-control-file"
                  id="image"
                  name="image"
                  onChange={handleInputChange}
                  required
                />
                {/* Display image preview */}
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Selected"
                    style={{ marginTop: "10px", maxWidth: "100%" }}
                  />
                )}
              </div>
              <div className=" post-buttons container">
                <button
                  type="submit"
                  className="btn btn-primary mt-3"
                  style={{ width: "100%" }}
                >
                  Create Post
                </button>
              </div>
            </form>
          </Container>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
}

export default CreatePost;

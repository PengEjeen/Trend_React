import React, { useState } from "react";
import axios from "axios";

const Post = () => {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [birth, setBirth] = useState("");
  const [message, setMessage] = useState("");

  const handlePost = async (event) => {
    event.preventDefault(); // 폼 제출 기본 동작 막기

    try {
      const response = await axios.post(
        "http://172.23.238.238/api/q/v1/create",
        {
          subject: subject,
          content: content,
          create_date: birth,
        }
      );

      // 서버로부터 응답이 성공적일 때
      if (response.status === 200) {
        setMessage("Post successful!");
      }
    } catch (error) {
      // 에러가 발생했을 때
      setMessage("Post failed. Please check your credentials and try again.");
      console.error("There was an error!", error);
    }
  };

  return (
    <div>
      <h2>Post</h2>
      <form onSubmit={handlePost}>
        <div>
          <label>
            Subject:
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Content:
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Birth:
            <input
              type="date"
              value={birth}
              onChange={(e) => setBirth(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Post</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Post;

// en el archivo post.js

const Post = ({ post }) => {
  return (
    <header
    className="d-flex justify-content-between header-pad-t1"
    style={{ paddingTop: 30, paddingBottom: 30 }}
  >
    <img src="../assets/img/Group%201.svg" />
    <button
      className="btn btn-primary boton"
      type="button"
      style={{ padding: "0px !important", background: "#ffffff !important" }}
    >
      <img src="../assets/img/Group.png" />
    </button>
  </header>
  );
};

export default Post;

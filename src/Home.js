const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        marginTop: "40px",
      }}
    >
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/lG1QAyWvKlQ"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  );
};

export default Home;

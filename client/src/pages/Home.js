import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="card bg-white card-rounded w-50">
      <div className="card-header bg-dark text-center">
        <h1>Welcome to MoonBay!</h1>
      </div>
      <div className="card-body m-5">
        <h2>Hottest NFT collection right now:</h2>
          <ul className="square">
            <img src = "https://via.placeholder.com/350x150" alt="Placeholder" />
          </ul>
      </div>
      <div className="card-footer text-center m-3">
        <h2>Ready to explore?</h2>
        <Link to="/explore">
          <button className="btn btn-lg btn-danger">Explore!</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;

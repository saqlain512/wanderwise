import Layout from "../components/Layout/Layout";
import SearchBar from "../components/SearchBar";
import Recommendations from "../components/Recommendations";
import "../styles/HomePageStyles.css";

function HomePage() {
  return (
    <div>
        <Layout title="homepage">
          <div>
          <SearchBar/>
            <Recommendations/>
          </div>
        </Layout>
    </div>
  );
}

export default HomePage;

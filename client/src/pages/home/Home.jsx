import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import "./home.css";

const Home = () => {
  return (
    <div>
      <Navbar /> {/* Render the Navbar component */}
      <Header /> {/* Render the Header component */}
      <div className="homeContainer">
        <Featured /> {/* Render the Featured component */}
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList /> {/* Render the PropertyList component */}
        <h1 className="homeTitle">Homes guests love</h1>
        <FeaturedProperties /> {/* Render the FeaturedProperties component */}
        <MailList /> {/* Render the MailList component */}
      </div>
    </div>
  );
};

export default Home;

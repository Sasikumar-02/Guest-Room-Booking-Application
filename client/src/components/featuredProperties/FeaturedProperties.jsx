import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  // Fetch data using the useFetch hook
  const { data, loading, error } = useFetch("/homes?featured=true");

  return (
    <div className="fp">
      {loading ? (
        "Loading..."
      ) : (
        <>
          {data.map((item) => (
            <div className="fpItem" key={item._id}>
              {/* Display property image */}
              <img
                src={
                  "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/22/a1/9c/80/essentia-luxury-hotel.jpg?w=700&h=-1&s=1"
                }
                alt=""
                className="fpImg"
              />
              {/* Display property name, city, and price */}
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
              {/* Display property rating if available */}
              {item.rating && (
                <div className="fpRating">
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
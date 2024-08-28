import './App.css';
import { useState } from 'react';
import productsData from "./assets/items.json";
import ProductItem from "./components/item";

function App() {
  const [favorites, setFavorites] = useState(productsData.reduce((object, key) => 
    ({ ...object, [key.name]: -1}), {}));
  const [sort, setSort] = useState("productType");
  const [filter, setFilter] = useState({"release_time": [], "product_type": [], "processor": []});
  const [filterData, setFilterData] = useState(productsData);
  const [total, setTotal] = useState(0);
  const [showNav, setShowNav] = useState(false); // Set to false to hide filters by default
  const [menuActive, setMenuActive] = useState(false); // State for the mobile menu
  const [newMenuActive, setNewMenuActive] = useState(false); // State for the new mobile menu

  const allSorts = {
    productType: { method: (a, b) => (parseFloat(a.id) < parseFloat(b.id) ? -1 : 1) },
    ascending: { method: (a, b) => (parseFloat(a.price) < parseFloat(b.price) ? -1 : 1) },
    descending: { method: (a, b) => (parseFloat(a.price) > parseFloat(b.price) ? -1 : 1) },
  };

  const allFilters = 
   [{type: "processor", value: "ReStore-Tulsa"},
    {type: "processor", value: "ReStore Rack"},
    {type: "processor", value: "ReStore-Broken Arrow"},
    {type: "processor", value: "ReStore-Claremore"},
    {type: "release_time", value: "8/14"}, 
    {type: "release_time", value: "8/15"},
    {type: "release_time", value: "8/16"},
    {type: "release_time", value: "8/17"},
    {type: "product_type", value: "Furniture"},
    {type: "product_type", value: "Clothes"}, 
    {type: "product_type", value: "Accessories"},
    {type: "product_type", value: "Fitness"},
    {type: "product_type", value: "Other"}]

  const updateFavorites = (name, price) => {
    let tempFavorites = favorites;
    tempFavorites[name] = tempFavorites[name] === 1 ? -1 : 1;
    setTotal(total + tempFavorites[name] * parseFloat(price));
    setFavorites(tempFavorites);
  };

  const updateFilter = (newFilter, filterType) => {
    let tempFilters = filter[filterType];

    if (tempFilters.includes(newFilter)) {
      tempFilters.splice(tempFilters.indexOf(newFilter), 1);
    } 
    else {
      tempFilters.push(newFilter);
    }

    filter[filterType] = [...tempFilters];
    setFilter(filter);

    const size = filter["release_time"].length + filter["product_type"].length + filter["processor"].length;
    if (size === 0 || size === allFilters.length) {
      setFilterData(productsData);
    } 
    else {
      setFilterData(productsData.filter(item => 
        (filter["release_time"].includes(item["release_time"]) 
        || filter["release_time"].length === 0) && 
        (filter["product_type"].includes(item["product_type"]) 
        || filter["product_type"].length === 0) && 
        (filter["processor"].includes(item["processor"]) 
        || filter["processor"].length === 0)));
    }
  }

  const resetPage = () => {
    setSort("productType");
    setFilter({"release_time": [], "product_type": [], "processor": []});
    setFilterData(productsData);
    setFavorites(productsData.reduce((object, key) => ({ ...object, [key.name]: -1}), {}));
    setTotal(0);
  }

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  }

  const toggleNewMenu = () => {
    setNewMenuActive(!newMenuActive);
  }

  // Disable horizontal scrolling when scale is 1
  function disableHorizontalScroll() {
    if (window.visualViewport.scale === 1) {
      document.body.style.overflowX = 'hidden';
    } else {
      document.body.style.overflowX = 'auto';
    }
  }

  // Disable horizontal scrolling on page load if scale is 1
  disableHorizontalScroll();

  // Add an event listener for when the viewport changes (e.g., zooming)
  window.visualViewport.addEventListener('resize', disableHorizontalScroll);

  return (
    <div className="App">
      <nav>
        <div className="menu-icon" onClick={toggleMenu}>
          <div className="bar top-bar"></div>
          <div className="bar middle-bar"></div>
          <div className="bar bottom-bar"></div>
        </div>
        <div className="logo">
          <a href="https://greencountryhabitat.org/">
            <img src="https://images.squarespace-cdn.com/content/v1/60148fcfca55b203f218fe44/78437348-4849-4744-9026-560f2ae90f51/GCReStoreLogoWhite.png" 
                 width="291" alt="Green Country Habitat for Humanity Logo"></img>
          </a>
        </div>
        <ul>
          <li className="dropdown">
            <a href="" className="nav-locations">Locations</a>
            <div className="dropdown-content">
              <a href="https://www.greencountryrestore.org/restoretulsa">ReStore Tulsa</a>
              <a href="https://www.greencountryrestore.org/restore-rack">ReStore Rack</a>
              <a href="https://www.greencountryrestore.org/restorebrokenarrow">ReStore Broken Arrow</a>
              <a href="https://www.greencountryrestore.org/restoreclaremore">ReStore Claremore</a>
              <a href="https://fantasticlion.github.io/ReStoreItems/">ReStore Items</a>
            </div>
          </li>
          <li><a href="https://www.greencountryrestore.org/deconstruction">Deconstruction</a></li>
          <li><a href="https://www.greencountryrestore.org/habco">HABCO Cabinets</a></li>
          <li><a href="https://greencountryhabitat.org/careers">Careers</a></li>
          <li><a href="https://www.greencountryrestore.org/contactus">Contact Us</a></li>
        </ul>
        <div className={`overlay ${menuActive ? 'active' : ''}`}>
          <div className="close-btn" onClick={toggleMenu}>X</div>
          <div className="overlay-menu">
            {menuActive && !newMenuActive && (
              <>
                <li><a onClick={toggleNewMenu} className="underline">Locations &gt;</a></li>
                <li><a href="https://www.greencountryrestore.org/deconstruction">Deconstruction</a></li>
                <li><a href="https://www.greencountryrestore.org/habco">HABCO Cabinets</a></li>
                <li><a href="https://greencountryhabitat.org/careers">Careers</a></li>
                <li><a href="https://www.greencountryrestore.org/contactus">Contact Us</a></li>
              </>
            )}
            {menuActive && newMenuActive && (
              <>
                <li><a onClick={toggleNewMenu}>&lt; Back</a></li>
                <li><a href="https://www.greencountryrestore.org/restoretulsa">ReStore Tulsa</a></li>
                <li><a href="https://www.greencountryrestore.org/restore-rack">ReStore Rack</a></li>
                <li><a href="https://www.greencountryrestore.org/restorebrokenarrow">ReStore Broken Arrow</a></li>
                <li><a href="https://www.greencountryrestore.org/restoreclaremore">ReStore Claremore</a></li>
                <li><a href="https://fantasticlion.github.io/ReStoreItems/" className="underline">ReStore Items</a></li>
              </>
            )}
          </div>
        </div>
        {!menuActive && (
          <>
            <button className="go-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>↑</button>
            <button className="go-to-bottom" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>↓</button>
          </>
        )}
      </nav>


    {/* Conditionally render the toggle button */}
    {!menuActive && (
      <button onClick={() => setShowNav(!showNav)} className="toggle-button">
        {showNav ? 'Hide Filters' : 'Show Filters'}
      </button>
    )}
    
      <div className="product-cards">
        <h1>Green Country ReStores' Recent Facebook Items</h1>
        <div className="product"> {
          filterData.sort(allSorts[sort].method)
            .map((item, index) => (<ProductItem key={"product" + index} info={item} 
              added={favorites[item.name]} setStateOfParent={updateFavorites}/>))}</div>
      </div>

      {showNav && (
        <div className="favorites">
          <form>
            <div className="sorting">
              <h3>Sort By:</h3>
              <input className="jss4" type="radio" value="productType" defaultChecked name="sort" onClick={() => setSort("productType")}></input>
              <label> Product Date </label><br/>
              <input className="jss4" type="radio" value="ascending" name="sort" onClick={() => setSort("ascending")}></input>
              <label> Price: Ascending </label><br/>
              <input className="jss4" type="radio" value="descending" name="sort" onClick={() => setSort("descending")}></input>
              <label> Price: Descending </label><br/>
            </div>

            <div className="filtering">
              <h3>Product Type:</h3>
              <input type="checkbox" value="Furniture" onClick={() => updateFilter("Furniture", "product_type")}/>
              <label> Furniture </label><br/>
              <input type="checkbox" value="Clothes" onClick={() => updateFilter("Clothes", "product_type")}/> 
              <label> Clothes </label><br/>
              <input type="checkbox" value="Accessories" onClick={() => updateFilter("Accessories", "product_type")}/> 
              <label> Accessories </label><br/>
              <input type="checkbox" value="Fitness" onClick={() => updateFilter("Fitness", "product_type")}/> 
              <label> Fitness </label><br/>
              <input type="checkbox" value="Other" onClick={() => updateFilter("Other", "product_type")}/> 
              <label> Other </label><br/>
              
              <div className="filtering">
              <h3>Release Time:</h3>
              <div className="release-time-container">
                <div className="release-time-item">
                  <input type="checkbox" value="8/14" onClick={() => updateFilter("8/14", "release_time")}/> 
                  <label> 8/14 </label>
                </div>
                <div className="release-time-item">
                  <input type="checkbox" value="8/15" onClick={() => updateFilter("8/15", "release_time")}/> 
                  <label> 8/15 </label>
                </div>
                <div className="release-time-item">
                  <input type="checkbox" value="8/16" onClick={() => updateFilter("8/16", "release_time")}/> 
                  <label> 8/16 </label>
                </div>
                <div className="release-time-item">
                  <input type="checkbox" value="8/17" onClick={() => updateFilter("8/17", "release_time")}/> 
                  <label> 8/17 </label>
                </div>
              </div>
            </div>


              <h3>Processor:</h3>
              <input type="checkbox" value="ReStore-Tulsa" onClick={() => updateFilter("ReStore-Tulsa", "processor")}/> 
              <label> ReStore-Tulsa </label><br/>
              <input type="checkbox" value="ReStore Rack" onClick={() => updateFilter("ReStore Rack", "processor")}/> 
              <label> ReStore Rack </label><br/>
              <input type="checkbox" value="ReStore-Broken Arrow" onClick={() => updateFilter("ReStore-Broken Arrow", "processor")}/> 
              <label> ReStore-Broken Arrow </label><br/>
              <input type="checkbox" value="ReStore-Claremore" onClick={() => updateFilter("ReStore-Claremore", "processor")}/> 
              <label> ReStore-Claremore </label><br/>
            </div>
          
            <div>
              <h3>Total Price:</h3>
              <label>${total}</label>
            </div>
            <button onClick={() => resetPage()}>{"Reset"}</button>
          </form>
        </div>
      )}
<footer>
  <div className="footer-container">
    <div className="footer-mission">All purchases and donations support Green Country Habitat for Humanity's mission to make safe, quality, and affordable homes accessible to hardworking Tulsa area families.</div>
    <p>Donations accepted during open hours only. It is illegal to leave items when stores are closed.</p>
    <p>See our <a href="https://www.greencountryrestore.org/policies">Terms and Policies.</a></p>
    <p>Follow us for latest inventory:</p>

    <div className="footer-social">
      <a href="https://www.facebook.com/ReStoreTulsa1" target="_blank" rel="noopener noreferrer">
        <img src="https://raw.githubusercontent.com/fantasticlion/ReStoreItems/main/src/Facebook_icon.png" alt="Facebook" />
      </a>
      <a href="https://www.instagram.com/greencountryrestore/" target="_blank" rel="noopener noreferrer">
        <img src="https://raw.githubusercontent.com/fantasticlion/ReStoreItems/main/src/Instagram_icon.png" alt="Instagram" />
      </a>
    </div>
    
    <div className="footer-links">
      <ul>
        <li><a href="https://www.greencountryrestore.org/restoretulsa">ReStore Tulsa</a></li>
        <li><a href="https://www.greencountryrestore.org/restore-rack">ReStore Rack</a></li>
        <li><a href="https://www.greencountryrestore.org/restorebrokenarrow">ReStore Broken Arrow</a></li>
        <li><a href="https://www.greencountryrestore.org/restoreclaremore">ReStore Claremore</a></li>
        <li><a href="https://www.greencountryrestore.org/habco">HABCO Custom Cabinets</a></li>
        <li><a href="https://www.greencountryrestore.org/deconstruction">Deconstruction</a></li>
        <li><a href="https://greencountryhabitat.org/careers">Careers</a></li>
        <li><a href="https://www.greencountryrestore.org/contactus">Contact Us</a></li>
        <li><a href="https://www.greencountryrestore.org/donationpickup">Donation Pickup</a></li>
      </ul>
    </div>
    
    <p>Green Country Habitat for Humanity is a charitable organization under tax code 501 (c)(3), and contributions are tax deductible.</p>
    
    <p>
      <a href="mailto:info@greencountryhabitat.org">info@greencountryhabitat.org</a> /
      <a href="tel:+19183595555">918-359-5555</a>
    </p>
  </div>
</footer>


    </div>
  );
}

export default App;

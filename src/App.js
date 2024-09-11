import './App.css';
import { useState } from 'react';
import productsData from "./assets/items.json";
import ProductItem from "./components/item";
import productsBAData from "./assets/BA-items.json";
import ProductBAItem from "./components/BA-item";

function App() {
  const [favorites, setFavorites] = useState(productsData.reduce((object, key) => 
    ({ ...object, [key.name]: -1}), {}));
  const [BAfavorites, setBAFavorites] = useState(productsBAData.reduce((object, key) => 
    ({ ...object, [key.name]: -1}), {}));
  const [sort, setSort] = useState("productType");
  const [filter, setFilter] = useState({"release_time": [], "product_type": [], "processor": []});
  const [filterData, setFilterData] = useState(productsData);
  const [filterBAData, setFilterBAData] = useState(productsBAData);
  const [total, setTotal] = useState(0);
  const [showNav, setShowNav] = useState(false); // Set to false to hide filters by default
  const [menuActive, setMenuActive] = useState(false); // State for the mobile menu
  const [newMenuActive, setNewMenuActive] = useState(false); // State for the new mobile menu

  const allSorts = {
    productType: { method: (a, b) => (parseFloat(a.id) < parseFloat(b.id) ? -1 : 1) },
    ascending: { method: (a, b) => (parseFloat(a.unit_price) < parseFloat(b.unit_price) ? -1 : 1) },
    descending: { method: (a, b) => (parseFloat(a.unit_price) > parseFloat(b.unit_price) ? -1 : 1) },
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
    {type: "product_type", value: "Tile Flooring"},
    {type: "product_type", value: "Luxury Vinyl"}, 
    {type: "product_type", value: "Paint"},
    {type: "product_type", value: "Carpet"},
    {type: "product_type", value: "Electric"},
    {type: "product_type", value: "Furniture"},
    {type: "product_type", value: "Other"}]

  const updateFavorites = (name, unit_price, action) => {
    let tempFavorites = { ...favorites };
  
    if (action === 'add') {
      tempFavorites[name] = (tempFavorites[name] || 0) + 1;
      setTotal(Math.round((total + parseFloat(unit_price)) * 100) / 100);
    } else if (action === 'remove') {
      if (tempFavorites[name] > -1) {
        tempFavorites[name] -= 1;
        setTotal(Math.round((total - parseFloat(unit_price)) * 100) / 100);
      }
    }
    setFavorites(tempFavorites);
  };

  const updateBAFavorites = (name, unit_price, action) => {
    let tempBAFavorites = { ...BAfavorites };
  
    if (action === 'add') {
      tempBAFavorites[name] = (tempBAFavorites[name] || 0) + 1;
      setTotal(Math.round((total + parseFloat(unit_price)) * 100) / 100);
    } else if (action === 'remove') {
      if (tempBAFavorites[name] > -1) {
        tempBAFavorites[name] -= 1;
        setTotal(Math.round((total - parseFloat(unit_price)) * 100) / 100);
      }
    }
    setBAFavorites(tempBAFavorites);
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
      setFilterBAData(productsBAData);
    } 
    else {
      setFilterData(productsData.filter(item => 
        (filter["release_time"].includes(item["release_time"]) 
        || filter["release_time"].length === 0) && 
        (filter["product_type"].includes(item["product_type"]) 
        || filter["product_type"].length === 0) && 
        (filter["processor"].includes(item["processor"]) 
        || filter["processor"].length === 0)));
      setFilterBAData(productsBAData.filter(item => 
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
    setFilterBAData(productsBAData);
    setFavorites(productsData.reduce((object, key) => ({ ...object, [key.name]: -1}), {}));
    setBAFavorites(productsBAData.reduce((object, key) => ({ ...object, [key.name]: -1}), {}));
    setTotal(0);
  }

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  }

  const toggleNewMenu = () => {
    setNewMenuActive(!newMenuActive);
  }

  const toggleProductVisibility = () => {
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
      if (product.style.display === 'none') {
        product.style.display = 'flex';
      } else {
        product.style.display = 'none';
      }
    });
  };

  const toggleBAProductVisibility = () => {
    const products = document.querySelectorAll('.BAproduct');
    products.forEach(product => {
      if (product.style.display === 'none') {
        product.style.display = 'flex';
      } else {
        product.style.display = 'none';
      }
    });
  };


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
              <a href="https://fantasticlion.github.io/ReStoreItems/">ReStore Facebook Items</a>
              <a href="https://fantasticlion.github.io/ReStoreSigns/">ReStore Permanent Items</a>
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
                <li><a href="https://fantasticlion.github.io/ReStoreItems/">ReStore Facebook Items</a></li>
                <li><a href="https://fantasticlion.github.io/ReStoreSigns/" className="underline">ReStore Permanent Items</a></li>
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
      <h1>Permanent Items at Green Country ReStores</h1>
      <div className="inline-container">
        <h2>ReStore-Tulsa</h2>
        <button onClick={toggleProductVisibility} className="show-button">-</button>
      </div>

        
      <div className="product-cards">
        

        <div className="product"> {
          filterData.sort(allSorts[sort].method)
            .map((item, index) => (<ProductItem key={"product" + index} info={item} 
              added={favorites[item.name]} setStateOfParent={updateFavorites}/>))}</div>
      </div>

      <div className="inline-container">
        <h2>ReStore-Broken Arrow</h2>
        <button onClick={toggleBAProductVisibility} className="show-button">-</button>
      </div>

      <div className="product-cards">
        

        <div className="BAproduct"> {
          filterBAData.sort(allSorts[sort].method)
            .map((item2, index2) => (<ProductBAItem key={"product" + index2} info={item2} 
              added={BAfavorites[item2.name]} setStateOfParent={updateBAFavorites}/>))}</div>
      </div>

      {showNav && (
        <div className="favorites">
          <form>
            <div className="sorting">
              <h3>Sort By:</h3>
              <input className="jss4" type="radio" value="productType" defaultChecked name="sort" onClick={() => setSort("productType")}></input>
              <label> Product Type </label><br/>
              <input className="jss4" type="radio" value="ascending" name="sort" onClick={() => setSort("ascending")}></input>
              <label> Unit Price: Ascending </label><br/>
              <input className="jss4" type="radio" value="descending" name="sort" onClick={() => setSort("descending")}></input>
              <label> Unit Price: Descending </label><br/>
            </div>

            <div className="filtering">
              <h3>Product Type:</h3>
              <input type="checkbox" value="Tile Flooring" onClick={() => updateFilter("Tile Flooring", "product_type")}/>
              <label> Tile Flooring </label><br/>
              <input type="checkbox" value="Luxury Vinyl" onClick={() => updateFilter("Luxury Vinyl", "product_type")}/> 
              <label> Luxury Vinyl </label><br/>
              <input type="checkbox" value="Paint" onClick={() => updateFilter("Paint", "product_type")}/> 
              <label> Paint </label><br/>
              <input type="checkbox" value="Carpet" onClick={() => updateFilter("Carpet", "product_type")}/> 
              <label> Carpet </label><br/>
              <input type="checkbox" value="Electric" onClick={() => updateFilter("Electric", "product_type")}/> 
              <label> Electric </label><br/>
              <input type="checkbox" value="Furniture" onClick={() => updateFilter("Furniture", "product_type")}/> 
              <label> Furniture </label><br/>
              <input type="checkbox" value="Other" onClick={() => updateFilter("Other", "product_type")}/> 
              <label> Other </label><br/>
            </div>
          
            <div>
              <h3>Total Price:</h3>
              <total-price>${total}</total-price>
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

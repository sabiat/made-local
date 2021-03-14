export default function ShopBadge() {
  return (
    <div
      style={{
        border: "2px solid red",
        borderRadius: "10px",
        margin: "5px",
      }}
      onClick={() => {
        console.log("Working");
      }}
    >
      <h1>Shop Name</h1>
      <p>@username</p>
      <img
        width="25px"
        src="https://images.pexels.com/photos/4916562/pexels-photo-4916562.jpeg?cs=srgb&dl=pexels-maria-orlova-4916562.jpg&fm=jpg"
      />
      <span>1.00 km away</span>
    </div>
  );
}

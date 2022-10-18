import React from "react";

function FormEditProduct() {
  return (
    <div className="mt-5">
      <h1 className="title">Products</h1>
      <h1 className="subtitle">Add new Product</h1>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input type="text" className="input" placeholder="Name" />
                </div>
              </div>
              <div className="field">
                <label className="label">Price</label>
                <div className="control">
                  <input type="number" className="input" placeholder="Price" />
                </div>
              </div>

              <div className="field mt-5">
                <div className="control">
                  <button className="button is-success">Save</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormEditProduct;

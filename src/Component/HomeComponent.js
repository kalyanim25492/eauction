import React, { Component } from 'react';
import { Button } from 'primereact/button';
import UserService from '../services/UserService';
import PostService from '../services/PostService';
import { Dialog } from 'primereact/dialog';
import ViewTweetComponent from '../TweetComponent/ViewTweetComponent';
import ViewMyTweetComponent from '../TweetComponent/ViewMyTweetComponent';
import ResetPasswordComponent from '../ChangePasswordComponent/ResetPasswordComponent';
class HomeComponent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showUser: false,
      showSearchUser: false,
      showAllTweet: true,
      showUserTweet: false,
      showPasswordReset: false,
      users: [],
      searchUser: {},
      searchData: '',
      message: '',
      searchMessage: '',
      showPostTweet: false,
      tweetMessage: {},
      product:{},
      info:{},
      error: '',
      postError: ''

    }
  }
  componentDidMount() {

    UserService.getUserSearch(localStorage.getItem('loginId')).then(response => {


      console.log(response.data);

    });
  }
  logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('loginId');
    this.props.history.push('/');

  }
  setData() {
    return localStorage.getItem('loginId');

  }
  displayPostTweet = (e) => {
    this.setState({ showPostTweet: true });
    this.setState({ postError: '' });
    this.setState({ tweetMessage: {} });

  }
  displayPasswordReset = (e) => {
    this.setState({ showPasswordReset: true });
  }
  handleChange = (e) => {
    this.setState({ searchData: e.target.value })
  }
  handleTweetChange = (item, e) => {
    let product = this.state.product;
    product[item] = e.target.value;
    this.setState({ product })
  }
  handleInfoChange = (item, e) => {
    let info = this.state.info;
    info[item] = e.target.value;
    this.setState({ info })
  }

  getAllUsers = (e) => {
    e.preventDefault();
    this.setState({ message: '' });
    UserService.getUser().then(response => {
      this.setState({ users: response.data });
      console.log(this.state.users);
      if (this.state.users == []) {
        this.setState({ message: "No User Found" });
      }

    });
    this.setState({ showUser: true });
    this.setState({ showSearchUser: false });
    this.setState({ showPostTweet: false });
    this.setState({ showAllTweet: false });
    this.setState({ showUserTweet: false });
  }
  getUserSearch = (e) => {
    e.preventDefault();
    this.setState({ searchMessage: '' });
    UserService.getUserSearch(this.state.searchData).then(response => {
      this.setState({ searchUser: response.data });

      console.log(this.state.users);
      if (this.state.searchUser == []) {
        this.setState({ searchMessage: "No User Found" });
      }

    });
    this.setState({ showUser: false });
    this.setState({ showSearchUser: true });
    this.setState({ showPostTweet: false });
    this.setState({ showAllTweet: false });
    this.setState({ showUserTweet: false });

  }
  getAllTweet = (e) => {
    e.preventDefault();
    this.setState({ showUser: false });
    this.setState({ showSearchUser: false });
    this.setState({ showPostTweet: false });
    this.setState({ showAllTweet: true });
    this.setState({ showUserTweet: false });


  }
  getUserTweet = (e) => {
    e.preventDefault();
    this.setState({ showUser: false });
    this.setState({ showSearchUser: false });
    this.setState({ showPostTweet: false });
    this.setState({ showAllTweet: false });
    this.setState({ showUserTweet: true });


  }
  onHide() {
    this.setState({ showPostTweet: false });
  }
  saveTweet() {
    //e.preventDefault();
    this.setState({ postError: '' });
    let tweet = {product:this.state.product,info:this.state.info};
console.log("tweetMessag1e"+JSON.stringify(tweet));
    PostService.postTweet(tweet).then(response => { });
    this.setState({ showPostTweet: false });
  }
  renderFooter() {
    return (
      <div>
        <Button label="Cancel" onClick={() => this.onHide()} className="p-button-text" />
        <Button label="Post" onClick={() => this.saveTweet()} autoFocus />
      </div>
    );
  }


  render() {
    return (
      <div>
        <nav className="navbar navbar-default navbar-dark bg-dark">
          <ul className="nav navbar-nav"><li><a href="" className="navbar-brand">E-AUCTION APPLICATION</a></li></ul>
          <ul className="nav navbar-nav text">
            <li><Button className="p-button p-button-rounded" icon="pi pi-users" iconPos="right" title="view users" onClick={this.getAllUsers.bind(this)} /></li>
            <li><Button className="p-button p-button-rounded" icon="pi pi-plus" iconPos="right" title="Add a product" onClick={this.displayPostTweet.bind(this)} /></li>
            <li >
              <div class="dropdown">
                <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {this.setData()}
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item" href="#" onClick={this.getUserTweet.bind(this)}>View My Products</a>
                  <a class="dropdown-item" href="#" onClick={this.getAllTweet.bind(this)}>View All Products</a>
                  <a class="dropdown-item" href="#" onClick={this.displayPasswordReset.bind(this)}>Reset Password</a>
                  <a class="dropdown-item" href="#" onClick={this.logout.bind(this)}><i class="pi pi-sign-out">&nbsp;Logout</i></a>
                </div>
              </div>
            </li></ul></nav>
        {this.state.showUser && <div className="user">
          <h3 className="center">Users</h3><br />
          <div className="center">{this.state.message}</div>
          <table className="table table-striped ">
            {
              this.state.users.map(
                user =>
                  <tr key={user.loginId}>
                    <td>  {user.firstName} </td>
                    <td> {user.lastName}</td>
                    <td>{user.dob}</td>
                  </tr>)}
          </table>
        </div>}
        {this.state.showSearchUser && <div className="user">
          <h3 className="center">Users</h3><br />
          <div className="center">{this.state.searchMessage}</div>
          <table className="table table-striped ">
            {<tr >
              <td>  {this.state.searchUser.firstName} </td>
              <td> {this.state.searchUser.lastName}</td>
              <td>{this.state.searchUser.dob}</td>
            </tr>}
          </table></div>}
        <Dialog header="Add a prodsuct" footer={this.renderFooter()} visible={this.state.showPostTweet} style={{ width: '50vw' }}>
          <br /><input placeholder="Enter Product Name" name="productName" className="form-control"
            value={this.state.product["productName"]} onChange={this.handleTweetChange.bind(this, "productName")} />
          <br /><input placeholder="Enter Short Description" name="shortDesc" className="form-control"
            value={this.state.product["shortDesc"]} onChange={this.handleTweetChange.bind(this, "shortDesc")} />
          <br /><input placeholder="Enter Detailed Description" name="detailedDesc" className="form-control"
            value={this.state.product["detailedDesc"]} onChange={this.handleTweetChange.bind(this, "detailDesc")} />
          <br /><select placeholder="Select Category" name="category" className="form-control"
            value={this.state.product["category"]} onChange={this.handleTweetChange.bind(this, "category")}>
            <option>Select Category</option>
            <option>PAINTING</option>
            <option>SCULPTOR</option>
            <option>ORNAMENT</option>
          </select>
          <br /><input placeholder="Enter Starting Price" name="startingPrice" className="form-control"
            value={this.state.product["startPrice"]} onChange={this.handleTweetChange.bind(this, "startPrice")} />
          <br /><input placeholder="Enter Bid End Date" name="bidEndDate" className="form-control"
            value={this.state.product["endDate"]} onChange={this.handleTweetChange.bind(this, "endDate")} />
            <br /><input placeholder="Enter User Address" name="address" className="form-control"
            value={this.state.info["address"]} onChange={this.handleInfoChange.bind(this, "address")} />
            <br /><input placeholder="Enter city" name="city" className="form-control"
            value={this.state.info["city"]} onChange={this.handleInfoChange.bind(this, "city")} />
            <br /><input placeholder="Enter state" name="state" className="form-control"
            value={this.state.info["state"]} onChange={this.handleInfoChange.bind(this, "state")} />
            <br /><input placeholder="Enter pin" name="pin" className="form-control"
            value={this.state.info["pin"]} onChange={this.handleInfoChange.bind(this, "pin")} />
            <br /><input placeholder="Enter phone" name="phone" className="form-control"
            value={this.state.info["phone"]} onChange={this.handleInfoChange.bind(this, "phone")} />
            <br /><input placeholder="Enter first_name" name="first_name" className="form-control"
            value={this.state.info["first_name"]} onChange={this.handleInfoChange.bind(this, "first_name")} />
           <br /><input placeholder="Enter last_name" name="last_name" className="form-control"
            value={this.state.info["last_name"]} onChange={this.handleInfoChange.bind(this, "last_name")} />
            <br /><input placeholder="Enter email" name="email" className="form-control"
            value={this.state.info["email"]} onChange={this.handleInfoChange.bind(this, "email")} />
          <br /><span className="error"> {this.state.postError}</span>
        </Dialog>

        {this.state.showAllTweet && <div className="user">
          <ViewTweetComponent /></div >}
        {this.state.showUserTweet && <div className="user">
          <ViewMyTweetComponent /></div>}
        {this.state.showPasswordReset && <div >
          <ResetPasswordComponent /></div>}

      </div>
    )
  }
}

export default HomeComponent

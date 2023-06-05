import React, { Component } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import PostService from '../services/PostService';
import img1 from '../image/painting.jpg';
import img2 from '../image/scultor.webp';
import img3 from '../image/Ornament.jpg';
import './TweetStyle.css';
import { Dialog } from 'primereact/dialog';

class ViewTweetComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tweets: [],
            showReplyTweet: false,
            showUpdateTweet: false,
            replyTweets: [],
            reply: {},
            message: '',
            layout: 'list',
            error: '',
            updateBid:false,
            currentProductId:'',
            currentUser:'',
            updateTweet: {},
            updateTweetId: '',
            email: ''

        };
        this.itemTemplate = this.itemTemplate.bind(this);

    }
    getReplyTweet(product) {        
        PostService.getReplyTweet(parseInt(product.productId)).then(response => this.setState({ replyTweets: response.data, 
            currentProductId: response.data.product.productId,  currentUser: response.data.info}));
        this.setState({ showReplyTweet: true });
       // this.setState({currentProductId:this.state.replyTweets.id})
        console.log('products'+JSON.stringify(this.state.currentUser));
        this.setState({ reply: {} });
        this.setState({ error: '' });

    }
    saveReplyTweet(e) {
        this.setState({ error: '' });        
        console.log("info"+JSON.stringify(this.state.reply["replyMessage"]))
        let request = {"bidAmount":parseInt(this.state.reply["bidAmount"]),"productId":this.state.currentProductId,"info":this.state.currentUser};
            PostService.saveReplyTweet(request).then(response => {
                PostService.getReplyTweet(this.state.currentProductId).then(response => this.setState({ replyTweets: response.data }));

            });
    }
    componentDidMount() {
        PostService.getAllTweet().then(response => this.setState({ tweets: response.data }));
    }

    saveLike(username, id) {
        PostService.saveLike(username, id).then(response => { this.componentDidMount() });
    }
    handleBidUpdate(e)
    {
        PostService.getReplyTweet(this.state.currentProductId).then(response => this.setState({ replyTweets: response.data, 
            email: response.data.info.email}));
          
        PostService.updateBidAmount(this.state.currentProductId,this.state.email,this.state.reply["bidAmount"]).then
        (response=>{this.setState({showUpdateTweet:false, showReplyTweet:false})})
    }
s
    renderListItem(data) {
        return (
            <div className="p-col-12 mainContainer">
                <div className="tweet-list-item">
                    <div className="tweet-list-detail">

                        <div className="tweet-name">{data.productName}</div>
                        <div className="item-image">
                            <img src={data.category === 'PAINTING' ? img1 : data.category === "SCULPTOR" ? img2 : data.category === "ORNAMENT" ? img3 : 'img'} alt="Logo" />
                        </div>
                        <div className="tweet-description">{data.category}&nbsp;&nbsp;</div>
                        <div className="tweet-description"><i>{data.shortDesc}</i>

                        </div>

                        <div className="tweet-deescription"><b>${data.startPrice}</b></div>
                        <div className="tweet-deescription">Biding End Date: <i>{data.endDate}</i></div>
                        <button className='actions' icon="pi pi-comment" title="Bid" onClick={() => this.getReplyTweet(data)} >Bid</button>&nbsp; &nbsp;&nbsp;
                       
                        <button title="Update Product" onClick={() => this. displayUpdateTweet(data)} ><i class="pi pi-user-edit"></i></button>&nbsp; &nbsp;&nbsp;
                    <button title="Delete Product" onClick={() => this. deleteTweet(data.productId)} ><i class="pi pi-trash"></i></button> 
                    </div>

                </div>
            </div>
        );
    }
    renderFooter(option) {
        console.log(option)
         if (option == "bid-update") {
            return (
                <div>
                    <Button label="Close" onClick={(e) => this.onHide(e,"bid-update")} className="p-button-text" />
                    <Button label="Save" onClick={(e) => this.handleBidUpdate(e)} autoFocus />
                </div>
            );
        }
        else  return (
            <div>
                <Button label="Cancel" onClick={(e) => this.onHide(e,"bid")} className="p-button-text" />
                <Button label="Place Bid" onClick={(e) => this.saveReplyTweet(e)} autoFocus />
            </div>
        );
    }
    onHide(e,option) {
        if(option==="bid")
        this.setState({ showReplyTweet: false });
        else 
        this.setState({showUpdateTweet:false})
    }
    handleReplyChange = (e) => {
        let reply = this.state.reply;
        reply["bidAmount"] = e.target.value;
        this.setState({ reply })
    }

    displayUpdateTweet(data) {
        this.setState({currentProductId:data.productId})
        this.setState({ showUpdateTweet: true });
        this.setState({ updateTweet: data });
    }

    deleteTweet(id) {
        PostService.deleteProduct(id).then(response => { this.componentDidMount() });
    }


    itemTemplate(tweet, layout) {
        if (!tweet) {
            return;
        }

        if (layout === 'list')
            return this.renderListItem(tweet.product);

    }

    renderHeader() {
        return (
            <div className="center"><h4>Products</h4></div>
        );
    }
    handleUpdateCheck(e,p,u)
    {
        console.log("handleupdatecheck")
        this.setState({showUpdateTweet:true,currentProductId:p, currentUser:u})
    }
    render() {
        const header = this.renderHeader();

        return (
            <div>
                <div className="dataview-demo">
                    <div className="card">
                        <DataView value={this.state.tweets} layout={this.state.layout} header={header}
                            itemTemplate={this.itemTemplate} paginator rows={3} />


                    </div>
                </div>

                <Dialog header="Enter Bid Amount" footer={this.renderFooter("bid")} 
                onHide={e=>this.onHide(e,"bid")}
                visible={this.state.showReplyTweet} style={{ width: '40vw' }}>

                    
                    <br /><span className="error"> {this.state.error}</span>
                    <br /><input placeholder="Enter bid amount" name="post" className="form-control"
                        value={this.state.reply["replyMessage"]} onChange={this.handleReplyChange} />

                </Dialog>
                <table className="table table-striped ">                       
                           
                                    <tr key={this.state.currentProductId}>
                                       
                                        <td>
                                       
                                        </td>
                                        
                                    </tr>
                    </table>
                <Dialog header="Update your Bid Amount" 
                footer={this.renderFooter("bid-update")}                
                onHide={e=>this.onHide(e,"bid-update")}
                visible={this.state.showUpdateTweet} style={{width:'40vw'}} >
                    <input placeholder='enter new bid amount'
                     name="post" className='form-control'
                     value={this.state.reply["replyMessage"]} onChange={this.handleReplyChange} />
                </Dialog>
            </div>
        );
    }
}

export default ViewTweetComponent
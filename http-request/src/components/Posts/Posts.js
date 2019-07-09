import React, {Component} from 'react';
import axios from '../../axios';
import { Route } from 'react-router-dom';

import Post from '../Post/Post';
import FullPost from '../FullPost/FullPost'

class Posts extends Component {

  state = {
    posts: [],
    error: false
  }

  componentDidMount() {
      console.log(this.props)
      axios.get('/posts')
        .then(res => {
          const posts = res.data.slice(0,4)
          const updatedPosts = posts.map(post => {
            return {
              ...post,
              author: 'zonecc'
            }
          });
          this.setState({
            posts: updatedPosts
          });
        })
        .catch(error => {
          this.setState({error: true})
        });;
  }

  postSelecteedHandler = (id) => {
    // this.props.history.push({pathname: '/' + id})
    this.props.history.push('/posts/' + id)
  }

  render () {
      let posts = <p style={{textAlign: 'center'}}> Something went wrong!!</p>

      if (!this.state.error){
          posts = this.state.posts.map(post => {
          return (
            // <Link to={'/' + post.id} key={post.id}>
              <Post
                key={post.id}
                title={post.title}
                body={post.body}
                author={post.author}
                clicked={() => this.postSelecteedHandler(post.id)}
              />
            // </Link>
          );
        });
      }
      return (
        <div>
          <section className="Posts">
            {posts}
          </section>
          {/*<Route path={"/posts/:id"} exact component={FullPost} />*/}
          <Route path={this.props.match.url + "/:id"} exact component={FullPost} />
        </div>
      );
  }
}

export default Posts;

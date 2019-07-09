import React, { Component } from 'react';
import {Route, NavLink, Switch/*, Redirect*/} from 'react-router-dom';

import Posts from '../../components/Posts/Posts';
import asyncComponent from '../../hoc/asyncComponent';

import './Blog.css';

const AsyncNewComponent = asyncComponent(() => {
  return import('../../components/NewPost/NewPost');
})

class Blog extends Component {

    state = {
      auth: true
    }

    render () {

        return (
            <div className="Blog">
                <header>
                  <nav>
                    <ul>
                      <li><NavLink to='/posts' exact> Posts </NavLink></li>
                      <li><NavLink to={{
                        pathname: '/new',
                        hash: '#submit',
                        search: '?quick-submit=true'
                      }}> Create New Post </NavLink></li>
                    </ul>
                  </nav>
                </header>
                <Switch>
                  {this.state.auth ? <Route path="/new" component={AsyncNewComponent} />: null}
                  <Route path='/posts' component={Posts} />
                  <Route render={() => <h1 style={{textAlign: 'center' , marginTop: '300px'}}>404 Page Not Found </h1>} />
                  {/*<Redirect from='/' to='/posts' />*/}
                  {/*<Route path='/ ' component={Posts} />*/}
                </Switch>
            </div>
        );
    }
}

export default Blog;

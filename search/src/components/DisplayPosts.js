import React from 'react'

const DisplayPosts = ({searchData}) => {
  return (<>
    <div className="total-posts">Total Posts: {searchData.length}</div>
    <div className="post-wrapper">
        {searchData.map((post) => {
          return (
            <div key={post.id} className="post">
              <div className="post-title">{post.title}</div>
              <div className="post-user-id">User Id: {post.userId}</div>
              <div className="post-msg">{post.body}</div>
            </div>
          );
        })}
      </div>
  </>)
}

export default DisplayPosts;
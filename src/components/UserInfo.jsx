import React from 'react';
import moment from "moment";

const UserInfo = ({user}) => {

  let originalBlogUrl = new String(user.blog);
  
  const blogURLValidator = () => {    
    if (user.blog) {
      if (!originalBlogUrl.includes("http") || !originalBlogUrl.includes("https")) {
        const correctBlogUrl = "http://" + originalBlogUrl;
        return correctBlogUrl;
      } else {
        const correctBlogUrl = originalBlogUrl;
        return correctBlogUrl;
      }
    }
  };

  const correctBlogUrl = blogURLValidator();

  const formattedCreatedDate = moment(user.created_at).format('MMMM D, YYYY');

  return ( 
    <div class="flex justify-between p-9 pb-0">
    <div class="flex-col"> 
      <h1 class="text-6xl font-bold">{user.name ? user.name : user.login}</h1>
      <h1 class="text-4xl py-1">
        <a class="transition duration-150 hover:underline hover:underline-offset-4 hover:text-sky-500" href={user.html_url}>@{user.login}</a>
      </h1>
      <h1 class="text-4xl font-extralight pt-4 pb-1">{user.bio}</h1>
      {user.twitter_username ? <h1 class="text-xl pt-1">
        Twitter: <a class="text-sky-500 transition duration-150 hover:underline" href={"https://twitter.com/" + user.twitter_username}>@{user.twitter_username}</a>
      </h1> : null}
      <h1 class="text-sky-500 transition duration-150 hover:underline text-xl font-extralight py-1">
        <a href={correctBlogUrl}>{user.blog}</a>
      </h1>
      <div class="flex flex-row py-2">
        {!user.following == 0 ? <a class="transition duration-150 hover:underline" href={"https://github.com/" + user.login + "?tab=following"}><h5 class="font-extralight pr-4">
         <strong class='font-bold'>{user.following}</strong> Following
        </h5></a> : null}
        {user.followers > 1 ? <a class="transition duration-150 hover:underline" href={"https://github.com/" + user.login + "?tab=followers"}><h5 class="font-extralight pr-4">
         <strong class='font-bold'>{user.followers}</strong> Followers
        </h5></a> : null}
        {user.followers == 1 ? <a class="transition duration-150 hover:underline" href={"https://github.com/" + user.login + "?tab=followers"}><h5 class="font-extralight pr-4">
         <strong class='font-bold'>{user.followers}</strong> Follower
        </h5></a> : null}
        {user.followers == 0 && user.following == 0 && user.type == "User" ? <h5 class="font-extralight pr-4">
          Account is likely private.
        </h5> : null}
        {user.type == "Organization" ? <h5 class="font-extralight pr-4">
          Account is an organization.
        </h5> : null}
      </div>
      { !user.message ? <h5 class="font-extralight pt-2">
          Joined {formattedCreatedDate}
        </h5> : null}
    </div>
    <div class="hidden sm:flex shrink-0 w-28 h-28 xl:w-40 xl:h-40">
      <img class="rounded-full shadow-zinc-900 shadow-xl" alt={user.username} src={user.avatar_url}></img>
    </div>
  </div>
  )
}

export default UserInfo
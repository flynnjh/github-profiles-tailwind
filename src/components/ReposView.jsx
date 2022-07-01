import React from "react";

const ReposView = ({ repo }) => {
  
  return (
    <div class="p-3 py-3 text-xl font-sans"> 
      <div class="px-10 gap-6">
        <li>
          <l class="text-sky-500 transition duration-150 hover:underline xl:text-3xl sm:text-2xl font-extralight py-1">
            <a href={repo.html_url}>
              {repo.name} - {repo.stargazers_count} Stars, {repo.forks_count} forks
            </a>
          </l> 
        </li> 
      </div>
    </div> 
  );
};

export default ReposView;

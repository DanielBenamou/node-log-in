import React from 'react'

function Login():JSX.Element {
  return (
    <div className='Login'>
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css"/>
        <link href="/style.css" rel="stylesheet" type="text/css"></link>
			<form action="/auth" method="post">
				<label htmlFor="username">
					<i className="fas fa-user"></i>
				</label>
				<input type="text" name="username" placeholder="Username" id="username" required/>
				<label htmlFor="password">
					<i className="fas fa-lock"></i>
				</label>
				<input type="password" name="password" placeholder="Password" id="password" required/>
				<input type="submit" value="Login"/>
			</form>
    </div>
  )
}

export default Login
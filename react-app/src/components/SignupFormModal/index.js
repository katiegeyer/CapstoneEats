import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";

function SignupFormModal() {
	const dispatch = useDispatch();
	const history = useHistory();
	// const user = useSelector((state) => state.session.user);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [username, setUsername] = useState("");
	const [errs, setErrs] = useState([]);
	const [displayErr, setDisplayErr] = useState(false)
	const { closeModal } = useModal();

	useEffect(() => {
		const errors = {}
		if (!username) errors.username = "Username is required"
		if (username.length < 4) errors.usernameLengthSmall = "Username is under 4 characters"
		if (username.length > 20) errors.usernameLengthLarge = "Username is over 20 characters"
		// if (!email.includes('@')) errors.email = "Invalid Email"
		// if (!email.includes('.com' || '.edu' || '.net' || '.org' || '.gov')) errors.email = "Invalid Email"

		if (!email.includes('@') || (!email.includes('.com') && !email.includes('.io') && !email.includes('.edu') && !email.includes('.net') && !email.includes('.org') && !email.includes('.gov'))) errors.email = "Invalid Email";

		if (!password) errors.password = "Password is required"
		if (confirmPassword !== password) errors.confirmPassword = 'Passwords must match'
		setErrs(errors)
	}, [username, email, password, confirmPassword])


	const handleSubmit = async (e) => {
		e.preventDefault()
		if (Object.keys(errs).length > 0) {
			setDisplayErr(true)
			// console.log(displayErr)
			// console.log('handlesubmit', errs)
			return
		}
		else {
			const newUser = await dispatch(signUp(username, email, password))
			history.push('/recipes')
			// setUrl(`/groups/${newGroup.id}`)
			closeModal()
		}
	}

	return (
		<div className="login-page">
			{/* <img className="login-image" src='https://bakingamoment.com/wp-content/uploads/2021/02/IMG_9987-flourless-chocolate-cake.jpg' /> */}
			<div className="login-modal">
				<h1 className="signup-modal-h1" >Sign Up</h1>
				{displayErr === true && errs.email && (<div className="errors">· {errs.email}</div>)}
				{displayErr === true && errs.username && (<div className="errors">· {errs.username}</div>)}
				{displayErr === true && errs.usernameLengthSmall && (<div className="errors">· {errs.usernameLengthSmall}</div>)}
				{displayErr === true && errs.usernameLengthLarge && (<div className="errors">· {errs.usernameLengthLarge}</div>)}
				{displayErr === true && errs.password && (<div className="errors">· {errs.password}</div>)}
				{displayErr === true && errs.confirmPassword && (<div className="errors">· {errs.confirmPassword}</div>)}
				<br />
				<div className="signup-modal-content">
					<form
						onSubmit={handleSubmit}
						className="signup-modal-form"
					>
						<label className="signup-modal-labels">
							<div>Username</div>
							<input
								className="signup-modal-inputs"
								type="text"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								required
							/>
						</label>
						<br />
						<br />
						<label className="signup-modal-labels">
							<div>Email</div>
							<input
								className="signup-modal-inputs"
								type="text"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</label>
						<br />
						<br />

						<label className="signup-modal-labels">
							<div>Password</div>
							<input
								className="signup-modal-inputs"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</label>
						<br />
						<br />
						<label className="signup-modal-labels">
							<div>Confirm Password</div>
							<input
								className="signup-modal-inputs"
								type="password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								required
							/>
						</label>
						<br />
						<br />
						<div className="signup-modal-submit-div">
							<button
								className="signup-modal-submit-signup"
								type="submit"
								disabled={!email || !password || !confirmPassword}
							>Sign Up</button>
							<br />
							<br />

							<OpenModalButton
								buttonText="Already have an account? Log in"
								// onItemClick={closeMenu}
								modalComponent={<LoginFormModal />}
								signupModalClass='signup'
							/>
							<br />

							<br />
						</div>
					</form>
				</div>
			</div >
		</div >
	);

}

export default SignupFormModal;


// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useModal } from "../../context/Modal";
// import { signUp } from "../../store/session";
// import "./SignupForm.css";

// function SignupFormModal() {
// 	const dispatch = useDispatch();
// 	const [email, setEmail] = useState("");
// 	const [username, setUsername] = useState("");
// 	const [password, setPassword] = useState("");
// 	const [confirmPassword, setConfirmPassword] = useState("");
// 	const [errors, setErrors] = useState([]);
// 	const { closeModal } = useModal();

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		if (Object.keys(errs).length > 0) {
// 			setDisplayErr(true)
// 			// console.log(displayErr)
// 			// console.log('handlesubmit', errs)
// 			return
// 		}
// 		if (password === confirmPassword) {
// 			const data = await dispatch(signUp(username, email, password));
// 			if (data) {
// 				setErrors(data);
// 			} else {
// 				closeModal();
// 			}
// 		} else {
// 			setErrors([
// 				"Confirm Password field must be the same as the Password field",
// 			]);
// 		}
// 	};

// 	return (
// 		<>
// 			<h1>Sign Up</h1>
// 			<form onSubmit={handleSubmit}>
// 				<ul>
// 					{errors.map((error, idx) => (
// 						<li key={idx}>{error}</li>
// 					))}
// 				</ul>
// 				<label>
// 					Email
// 					<input
// 						type="text"
// 						value={email}
// 						onChange={(e) => setEmail(e.target.value)}
// 						required
// 					/>
// 				</label>
// 				<label>
// 					Username
// 					<input
// 						type="text"
// 						value={username}
// 						onChange={(e) => setUsername(e.target.value)}
// 						required
// 					/>
// 				</label>
// 				<label>
// 					Password
// 					<input
// 						type="password"
// 						value={password}
// 						onChange={(e) => setPassword(e.target.value)}
// 						required
// 					/>
// 				</label>
// 				<label>
// 					Confirm Password
// 					<input
// 						type="password"
// 						value={confirmPassword}
// 						onChange={(e) => setConfirmPassword(e.target.value)}
// 						required
// 					/>
// 				</label>
// 				<button type="submit">Sign Up</button>
// 			</form>
// 		</>
// 	);
// }

// export default SignupFormModal;

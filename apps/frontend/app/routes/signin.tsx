import React from 'react'
import { useNavigate } from 'react-router'

const Signin = () => {

    const navigate = useNavigate()
    const [formData, setFormData] = React.useState({ email: "", password: "" });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetch(`${import.meta.env.VITE_BACKEND_URL}user/signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        }).then(res => res.json()).then(data => {
            localStorage.setItem("token", data.token);
            navigate("/workflow");
        }).catch(err => console.log(err));
        console.log(formData);
    }
    
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-white"
            style={{ background: "radial-gradient(circle, #4C2E30 0%, #000000 100%)" }}>
            <h1 className="text-4xl mb-6">Sign in to n8n</h1>

            <form onSubmit={handleSubmit} className="bg-[#4C2E30]/80 border-2 border-white/10 p-6 flex flex-col space-y-4 rounded-xl w-80">
                <label className='mb-1' htmlFor="email">Email</label>
                <input
                    type="email"
                    placeholder="Email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="p-2 rounded-lg bg-[#30212B] border border-white/20 focus:outline-none"
                />

                <label className='mb-1' htmlFor="password">Password</label>
                <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="p-2 rounded-lg bg-[#30212B] border border-white/20 focus:outline-none"
                />
                <button type='submit' className='bg-blue-500 text-sm mt-4 py-3 px-5 rounded-lg cursor-pointer hover:text-white hover:font-semibold hover:bg-blue-600'>Sign in</button>
            </form>
            <p className='text-sm mt-4'>New here? <a className='text-blue-500 underline cursor-pointer' onClick={() => navigate("/signup")}>Sign up</a></p>

        </div>
    )
}

export default Signin

import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-slate-900 shadow-lg border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-white text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 hover:opacity-80 transition-opacity">
                            TodoApp
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link 
                            to="/" 
                            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                            All Todos
                        </Link>
                        <Link 
                            to="/add" 
                            className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-md hover:shadow-lg"
                        >
                            Add Todo
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

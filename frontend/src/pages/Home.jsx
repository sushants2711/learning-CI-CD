import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllTodoApi } from "../api/allApi";

const Home = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const data = await getAllTodoApi();
                // Assuming the API returns the list directly or inside a data property
                setTodos(data.todos || data.data || data || []);
            } catch (err) {
                setError(err.message || "Failed to load todos");
            } finally {
                setLoading(false);
            }
        };

        fetchTodos();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-8 bg-slate-900 rounded-2xl border border-red-500/30">
                <p className="text-red-400 text-lg mb-4">{error}</p>
                <button 
                    onClick={() => window.location.reload()}
                    className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                    Your Todos
                </h1>
                <Link 
                    to="/add" 
                    className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    New Task
                </Link>
            </div>

            {todos.length === 0 ? (
                <div className="text-center py-20 bg-slate-900/50 rounded-3xl border border-slate-800 border-dashed">
                    <div className="bg-slate-800/50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">No todos yet</h3>
                    <p className="text-slate-400 max-w-sm mx-auto mb-6">Get started by creating a new task to keep track of your goals.</p>
                    <Link 
                        to="/add"
                        className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all hover:-translate-y-0.5"
                    >
                        Create your first Todo
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {todos.map((todo) => (
                        <div 
                            key={todo._id} 
                            className="bg-slate-900 rounded-2xl border border-slate-800 p-6 hover:border-cyan-500/30 transition-all hover:shadow-xl hover:shadow-cyan-500/5 group relative overflow-hidden"
                        >
                            <div className={`absolute top-0 left-0 w-1 h-full ${todo.isActive ? 'bg-green-500' : 'bg-slate-700'}`}></div>
                            
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-bold text-white line-clamp-1 pr-4">{todo.title}</h3>
                                <span className={`px-2.5 py-1 text-xs font-semibold rounded-full flex-shrink-0 ${todo.isActive ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}>
                                    {todo.isActive ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                            
                            <p className="text-slate-400 text-sm mb-6 line-clamp-3 min-h-[60px]">
                                {todo.description}
                            </p>
                            
                            {todo.extraInformation && (
                                <div className="mb-6 p-3 bg-slate-950/50 rounded-xl border border-slate-800/50">
                                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Extra Info</p>
                                    <p className="text-sm text-slate-300 truncate">{todo.extraInformation}</p>
                                </div>
                            )}
                            
                            <div className="pt-4 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500">
                                <span>{new Date(todo.createdAt).toLocaleDateString()}</span>
                                <span className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-cyan-400 cursor-pointer">
                                    View Details 
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;

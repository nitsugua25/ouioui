// import {useState} from "react";
//
// const useAuth = () => {
//
//
//     const [user, setUser] = useState<User | null>(null);
//     const [loading, setLoading] = useState(false);
//
//     const login = async (email: string, password: string) => {
//         setLoading(true);
//         // Simulate an API call
//         setTimeout(() => {
//             setUser({ email });
//             setLoading(false);
//         }, 1000);
//     };
//
//     const logout = () => {
//         setUser(null);
//     };
//
//     return { user, loading, login, logout };
// }
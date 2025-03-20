import React, { useEffect, useState } from 'react';

export default function Rapports() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUserData(parsedUser);
        }
    }, []);

    return (
        <div className="p-6">
            {userData ? (
                <div className="bg-white shadow-lg rounded-xl p-4 w-full max-w-md mx-auto">
                    <h2 className="text-xl font-semibold mb-4">
                        Bonjour, {userData.nom} {userData.prenom}
                    </h2>
                    <div className="space-y-2">
                        {Object.entries(userData).map(([key, value], index) => (
                            <div
                                key={index}
                                className="flex justify-between border-b pb-1"
                            >
                                <span className="font-medium capitalize">{key}</span>
                                <span>{value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p className="text-red-500 text-center">
                    Aucune donnée utilisateur trouvée.
                </p>
            )}
        </div>
    );
}

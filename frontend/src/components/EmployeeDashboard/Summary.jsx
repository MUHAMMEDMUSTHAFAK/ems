import React from "react";
import { useAuth } from "../../hooks/useAuth";

const Summary = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center h-full p-10">
      <h1 className="text-3xl font-bold mb-4">
        Welcome back, {user?.name || "Employee"}!
      </h1>
      <p className="text-lg text-gray-600 text-center max-w-md">
        Here you can view your profile, salary details, and manage your tasks.
      </p>
    </div>
  );
};

export default Summary;

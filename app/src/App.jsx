import styles from "./App.module.css";
import "flowbite";
import Patients from "./Patients";
import Patient from "./Patient";
import { Route, Routes } from "@solidjs/router";

function App() {
  return (
    <div class={styles.App}>
      <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
        <div class="container flex flex-wrap items-center justify-between mx-auto">
          <a href="/" class="flex items-center">
            <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Stroke Risk App
            </span>
          </a>
        </div>
      </nav>
      <main class="bg-gray-50">
        <div class="container mx-auto pt-12 pb-12">
          <Routes>
            <Route path="/" component={Patients} />
            <Route path="/:id" component={Patient} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;

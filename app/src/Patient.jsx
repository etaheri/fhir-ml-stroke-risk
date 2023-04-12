import { useParams } from "@solidjs/router";
import { createResource, createEffect, createSignal, For, Show } from "solid-js";

/**
 * Fetches a patient resource from the HAPI FHIR server.
 * @param {string} id The ID of the patient to fetch
 */
const fetchPatient = async (id) =>
  (
    await fetch(`${import.meta.env.VITE_SOLID_APP_HAPI_URL}/fhir/Patient/${id}`)
  ).json();

/**
 * Fetches observations for a given patient id from the HAPI FHIR server.
 * @param {string} id
 * @returns {Array}
 * @throws {Error}
 */
const fetchObservations = async (id) =>
  (
    await fetch(
      `${
        import.meta.env.VITE_SOLID_APP_HAPI_URL
      }/fhir/Observation?subject=Patient/${id}`
    )
  ).json();

/**
 * Fetches conditions for the given patient from the HAPI FHIR server.
 *
 * @param {String} id The patient's id.
 *
 * @returns {Object} The conditions.
 */
const fetchConditions = async (id) =>
  (
    await fetch(
      `${
        import.meta.env.VITE_SOLID_APP_HAPI_URL
      }/fhir/Condition?subject=Patient/${id}`
    )
  ).json();

// fetchScore: fetches the score from the ML API.
// data: the data to send to the API.
const fetchScore = async (data) =>
  (
    await fetch(`${import.meta.env.VITE_SOLID_APP_API_URL}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
  ).json();

// Create a color from a percentage
// percentage is a decimal between 0 and 1
// return a color in the format "#RRGGBB"
// where RR, GG, and BB are hex values
function getColorFromPercentage(percentage) {
  if (percentage < 0) percentage = 0;
  if (percentage > 100) percentage = 100;

  const red = percentage > 70 ? 255 : Math.floor(255 * (percentage / 100));
  const green =
    percentage < 50 ? 255 : Math.floor(255 * ((100 - percentage) / 50));

  const hexRed = red.toString(16).padStart(2, "0");
  const hexGreen = green.toString(16).padStart(2, "0");
  const hexBlue = "00";

  return `#${hexRed}${hexGreen}${hexBlue}`;
}

// This function returns the age of a person based on their date of birth.
// The function expects the date of birth to be a JavaScript Date object.
// The function returns an integer representing the person's age.
function calculateAge(dateOfBirth) {
  var now = new Date();
  var dob = new Date(dateOfBirth);
  var yearDiff = now.getFullYear() - dob.getFullYear();
  var monthDiff = now.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < dob.getDate())) {
    yearDiff--;
  }
  return yearDiff;
}

// {
//   "gender": "Male",
//   "age": 79,
//   "hypertension": 1,
//   "heart_disease": 1,
//   "ever_married": "No",
//   "work_type": "Never_worked",
//   "Residence_type": "Urban",
//   "avg_glucose_level": 60,
//   "bmi": 28.10,
//   "smoking_status": "smokes"
// }

function Patient() {
  const params = useParams();
  const [patient] = createResource(params.id, fetchPatient);
  const [observations] = createResource(params.id, fetchObservations);
  const [conditions] = createResource(params.id, fetchConditions);
  const [score, setScore] = createSignal(null);

  createEffect(async () => {
    if (!patient() || !observations() || !conditions()) return;

    // Format the gender string to match the API
    const gender =
      patient()?.gender.toUpperCase() === "MALE" ? "Male" : "Female";

    // Calculate the age of the patient
    const age = calculateAge(patient()?.birthDate);

    // Check if the patient has hypertension, pass to the API as 0 or 1
    const hypertension = conditions()?.entry.find(
      (condition) => condition.resource.code.coding[0].code === "38341003"
    )
      ? 1
      : 0;

    // Check if the patient has heart disease, pass to the API as 0 or 1
    const heart_disease = conditions()?.entry.find(
      (condition) => condition.resource.code.coding[0].code === "49601007"
    )
      ? 1
      : 0;

    // Check if the patient has ever been married, pass to the API as "Yes" or "No"
    const ever_married =
      patient()?.maritalStatus?.text === "Yes" ? "Yes" : "No";

    // get work type from the extension on the patient resource
    const work_type = patient()?.extension?.find(
      (ex) => ex.url === "http://example.com/fhir/StructureDefinition/jobType"
    )?.valueCodeableConcept.coding[0].code;

    // get residence type from the extension on the patient resource
    const Residence_type = patient()?.extension?.find(
      (ex) =>
        ex.url === "http://example.com/fhir/StructureDefinition/residenceType"
    )?.valueCodeableConcept.coding[0].code;

    // Get the BMI and average glucose level from the observations
    const bmi = observations()?.entry.find(
      (observation) => observation.resource.code.coding[0].code === "39156-5"
    )?.resource.valueQuantity.value;

    // Get the BMI and average glucose level from the observations
    const avg_glucose_level = observations()?.entry.find(
      (observation) => observation.resource.code.coding[0].code === "1558-6"
    )?.resource.valueQuantity.value;

    // Get the smoking status from the observations
    const smoking_status =
      observations()?.entry.find(
        (observation) => observation.resource.code.coding[0].code === "72166-2"
      )?.resource.valueCodeableConcept.coding[0].code === "449868002"
        ? "smokes"
        : "never smoked";

    // Send the data to the API
    const data = {
      gender,
      age,
      hypertension,
      heart_disease,
      ever_married,
      work_type,
      Residence_type,
      avg_glucose_level,
      bmi,
      smoking_status,
    };
    const res = await fetchScore(data);
    setScore(res);
  });

  // Check if the patient has ever been married, pass to the API as "Yes" or "No"
  const everMarried = patient()?.maritalStatus?.text === "Yes" ? "Yes" : "No";

  // get work type from the extension on the patient resource
  const workType = patient()?.extension?.find(
    (ex) => ex.url === "http://example.com/fhir/StructureDefinition/jobType"
  )?.valueCodeableConcept.coding[0].code;

  // get residence type from the extension on the patient resource
  const residenceType = patient()?.extension?.find(
    (ex) =>
      ex.url === "http://example.com/fhir/StructureDefinition/residenceType"
  )?.valueCodeableConcept.coding[0].code;

  return (
    <>
      <h3 class="text-3xl font-bold dark:text-white">
        Patient: {patient()?.name[0].family}, {patient()?.name[0].given}
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <div class="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl font-bold leading-none text-gray-900">
              Patient Information
            </h3>
          </div>
          <div class="flow-root">
            <ul role="list" class="divide-y divide-gray-200">
              <li class="py-3 sm:py-4">
                <div>
                  <p class="text-base font-semibold text-gray-900">
                    Name: {patient()?.name[0].family},{" "}
                    {patient()?.name[0].given}
                  </p>
                  <p class="text-base font-semibold text-gray-900">
                    Gender: {patient()?.gender}
                  </p>
                  <p class="text-base font-semibold text-gray-900">
                    DOB: {patient()?.birthDate}
                  </p>
                  <p class="text-base font-semibold text-gray-900">
                    Age: {calculateAge(patient()?.birthDate)}
                  </p>
                  <p class="text-base font-semibold text-gray-900">
                    Marital Status: {everMarried}
                  </p>
                  <p class="text-base font-semibold text-gray-900">
                    Job Type: {workType}
                  </p>
                  <p class="text-base font-semibold text-gray-900">
                    Residence Type: {residenceType}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
          <h3 class="text-xl font-bold leading-none text-gray-900 mb-4">
            Stroke Risk Score
          </h3>
          <h4 class="text-lg font-bold leading-none text-gray-900 mb-2">
            {score()?.stroke_prediction} / 100
          </h4>
          <div class="flex items-center space-x-4">
            <div class="w-full bg-gray-200 rounded-full h-6">
              <div
                class="h-6 rounded-full"
                style={`width: ${
                  score()?.stroke_prediction || 0
                }%; background-color: ${getColorFromPercentage(
                  score()?.stroke_prediction || 0
                )};`}
              ></div>
            </div>
            {}
          </div>
        </div>
      </div>
      <div class="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
        <h3 class="text-xl font-bold leading-none text-gray-900">
          Observations
        </h3>
        <div class="relative overflow-x-auto mt-6">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Observation
                </th>
                <th scope="col" class="px-6 py-3">
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              <For each={observations()?.entry}>
                {({ resource }) => (
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {resource?.code?.coding[0].display}
                    </td>
                    <td
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {resource?.valueQuantity?.value}{" "}
                      {resource?.valueQuantity?.unit}
                      {resource?.valueCodeableConcept?.text}
                    </td>
                  </tr>
                )}
              </For>
              <Show when={observations()?.entry.length === 0}>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    No entries found
                  </td>
                </tr>
              </Show>
            </tbody>
          </table>
        </div>
      </div>
      <div class="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
        <h3 class="text-xl font-bold leading-none text-gray-900">
          Conditions
        </h3>
        <div class="relative overflow-x-auto mt-6">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Condition
                </th>
              </tr>
            </thead>
            <tbody>
              <For each={conditions()?.entry}>
                {({ resource }) => (
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {resource?.code?.text}
                    </td>
                  </tr>
                )}
              </For>
              <Show when={conditions()?.entry.length === 0}>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    No entries found
                  </td>
                </tr>
              </Show>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Patient;

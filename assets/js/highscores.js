// gets local scores
function loadScores() {
  const storageArray = getSortedLocalStorage();

  let innerHTML = ``;

  for (let i = 0; i < storageArray.length; i++) {
    innerHTML += `<tr>
                        <td>${i + 1}: ${storageArray[i].initials} - ${
      storageArray[i].score
    }</td>
                    </tr>`;
  }

  document.getElementById("leaderboardBody").innerHTML = innerHTML;
}

function getSortedLocalStorage() {
  const localStorageArray = [];

  for (let i = 0; i < localStorage.length; i++) {
    const initials = localStorage.key(i);
    localStorageArray.push({
      initials: initials,
      score: localStorage.getItem(initials),
    });
  }

  localStorageArray.sort((a, b) => {
    if (a.score > b.score) {
      return -1;
    }
    return 1;
  });

  return localStorageArray;
}

function clearScores() {
  // call loadScores() again after clearing
  localStorage.clear();
  loadScores();
}

function goBack() {
  // navigate back to index.html
  window.location.href = "./index.html";
}

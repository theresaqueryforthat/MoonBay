import { Link } from 'react-router-dom';

const Home = () => {
  return (<html lang="en">
<nav class="navbar sticky-top navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">NamePass</a>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="/signup">Sign up</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="/login">Sign in</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

<body>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/3.10.2/mdb.min.js"></script>
</body>
<footer class="fixed-bottom text-center text-white" style="background-color: #f1f1f1;">
  <div class="text-center text-light p-3 pb-6" style="background-color: black;">
    © 2022
    <a class="text-white" href="https://mynamepass.com/">NamePassPro</a>
  </div>
</footer>

</html>
  );
};

export default Home;
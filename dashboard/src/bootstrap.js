import { createApp } from "vue";
import Dashboard from "./components/Dashboard.vue";

const mount = el => {
  console.log('Mounting Dashboard with Vue');
  const app = createApp(Dashboard);

  // Vue mount function.
  app.mount(el);
};

if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_dashboard-dev-root');

  if (devRoot) {
    // if in dev mode run mount in isolation (not from the container micro)
    mount(devRoot, {});
  }
}

export { mount };

import './App.css';
import Messanger from './components/Messanger';
import AccountProvider from './context/AccountProvider';
import TemplateProvider from './themes/templateProvider'
import UserProvider from './context/UserProvider'


function App() {
  return (
    <div className="App">
      <TemplateProvider>
        <UserProvider>
          <AccountProvider>
            <Messanger />
          </AccountProvider>
        </UserProvider>
      </TemplateProvider>
    </div>
  );
}

export default App;

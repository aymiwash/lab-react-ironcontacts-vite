import { useState } from "react";
import "./App.css";
import contactsJSON from './contacts.json'
import uuid from "react-uuid";

function App() {

  contactsJSON.forEach((contact)=>{
    contact.id = uuid()
  })
  const [contacts, setContacts] = useState(contactsJSON.slice(0, 5))

  const addRandomContact = ()=>{
    const randomContactIndex = Math.floor(Math.random() * contactsJSON.length) + 5
    const randomContact = contactsJSON[randomContactIndex]
    if(randomContact !== undefined){
      setContacts(previousContacts =>
        [...previousContacts, randomContact]
      )
    }
  }

  const sortByName = ()=>{
    const sortedContactsByName = [...contacts].sort((a, b)=>{
      return a.name.localeCompare(b.name)
    })
    setContacts(sortedContactsByName)
  }

  const sortByPopularity = ()=>{
    const sortedContactsByPopularity = [...contacts].sort((a, b)=>{
      return a.popularity - b.popularity
    })
    setContacts(sortedContactsByPopularity)
  }

  const deleteContact = (id)=>{
    const contactId = contacts.find(contact => contact.id === id)
    const contactIndex = contacts.indexOf(contactId)
    setContacts(previousContacts=>{
      const newContactsArray = [...previousContacts]
      newContactsArray.splice(contactIndex, 1)
    return newContactsArray} )
  }

  return (
    <div className="App">
      <h1>LAB | React IronContacts</h1>

      <button className="button" onClick={addRandomContact}>Add Random Contact</button>
      <button className="button" onClick={sortByName}>Sort by name</button>
      <button className="button" onClick={sortByPopularity}>Sort by popularity</button>

      <table className="contacts-table">
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {
          contacts.map(oneContact =>{
            return (
              <tr key={oneContact.id}>
                <td><img className="contact-image" src={oneContact.pictureUrl ? oneContact.pictureUrl : ""} alt={oneContact.name}/></td>
                <td><h3>{oneContact.name}</h3></td>
                <td>{oneContact.popularity.toFixed(2)}</td>
                <td className="oscar">{oneContact.wonOscar ? "🏆" : null}</td>
                <td className="oscar">{oneContact.wonEmmy ? "🏆" : null}</td>
                <td><button className="button delete" onClick={()=>{deleteContact(oneContact.id)}}>Delete</button></td>
              </tr>
            )
          })
        }
        </tbody>
      </table>
    </div>
  );
}

export default App;

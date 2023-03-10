import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ContactService } from '../../../services/ContactService'
import Spinner from '../../Spinner/Spinner'

let ContactList = () => {
  let [query, setQuery] = useState({
    text: '',
  })

  let [state, setState] = useState({
    loading: false,
    contacts: [],
    filteredContacts: [],
    errorMessage: '',
  })

  useEffect(() => {
    async function handleResp() {
      try {
        setState({ ...state, loading: true })
        let response = await ContactService.getAllContacts()
        let groupResponse = await ContactService.getGroups()
        setState({
          ...state,
          loading: false,
          contacts: response.data,
          filteredContacts: response.data,
          groups: groupResponse.data,
        })
      } catch (error) {
        setState({
          ...state,
          loading: false,
          errorMessage: error.message,
        })
      }
    }
    handleResp()
  }, [])

  // delete contact
  let clickDelete = async (contactId) => {
    try {
      let response = await ContactService.deleteContact(contactId)
      if (response) {
        setState({ ...state, loading: true })
        let response = await ContactService.getAllContacts()
        setState({
          ...state,
          loading: false,
          contacts: response.data,
          filteredContacts: response.data,
        })
      }
    } catch (error) {
      setState({
        ...state,
        loading: false,
        errorMessage: error.message,
      })
    }
  }

  //search sites

  let searchContacts = (event) => {
    setQuery({ ...query, text: event.target.value })
    let theContacts = state.contacts.filter((contact) => {
      return contact.site
        .toLowerCase()
        .includes(event.target.value.toLowerCase())
    })
    setState({
      ...state,
      filteredContacts: theContacts,
    })
  }

  let { loading, contacts, filteredContacts, errorMessage, groups } = state

  return (
    <React.Fragment>
      <section className="contact-search p-3">
        <div className="container">
          <div className="grid">
            <div className="row">
              <div className="col">
                <p className="h3 fw-bold">
                  Vendor Manager
                  <Link to={'/contacts/add'} className="btn btn-primary ms-2">
                    <i className="fa fa-plus-circle me-2" /> New
                  </Link>
                </p>
                <p className="fst-italic">
                  Welcome to CW services Amazon account vendor management app.
                  Below simply type Site code in "Search site" box, to find list
                  of vendors for that site.
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <form className="row">
                  <div className="col">
                    {' '}
                    <div className="mb-2">
                      <input
                        name="text"
                        value={query.text}
                        onChange={searchContacts}
                        className="form-control"
                        placeholder="Search Site"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-2">
                      <input
                        type="submit"
                        className="btn btn-outline-dark"
                        value="Search"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {loading ? <Spinner /> : <React.Fragment></React.Fragment>}

      <section className="contact-list">
        <div className="container">
          <div className="row">
            {filteredContacts.length > 0 &&
              filteredContacts.map((contact) => {
                return (
                  <div className="col-md-6" key={contact.id}>
                    <div className="card my-2">
                      <div className="card-body">
                        <div className="row align-items-center d-flex justify-content-around">
                          <div className="col-md-4">
                            <img
                              src={contact.photo}
                              alt=""
                              className="contact-img"
                            />
                          </div>
                          <div className="col-md-7">
                            <ul className="list-group">
                              <li className="list-group-item list-group-item-action">
                                Site :{' '}
                                <span className="fw-bold">{contact.site}</span>
                              </li>
                              <li className="list-group-item list-group-item-action">
                                Manager :{' '}
                                <span className="fw-bold">
                                  {contact.site_manager}
                                </span>
                              </li>
                              <li className="list-group-item list-group-item-action">
                                Email :{' '}
                                <span className="fw-bold">{contact.email}</span>
                              </li>
                              <li className="list-group-item list-group-item-action">
                                <select
                                  name="groupId"
                                  value={contact.groupId}
                                  className="form-control"
                                >
                                  {groups.length > 0 &&
                                    groups.map((group) => {
                                      return (
                                        <option key={group.Id} value={group.id}>
                                          {group.name}
                                        </option>
                                      )
                                    })}
                                </select>
                              </li>
                            </ul>
                          </div>

                          <div className="col-md-1 d-flex flex-column align-items-center">
                            <div className="media p-3 mt-3">
                              <div className="media">
                                <Link
                                  to={`/contacts/view/${contact.id}`}
                                  className="btn btn-warning my-1"
                                >
                                  <i className="fa fa-eye" />
                                </Link>
                                <Link
                                  to={`/contacts/edit/${contact.id}`}
                                  className="btn btn-primary my-1"
                                >
                                  <i className="fa fa-pen" />
                                </Link>
                                <button
                                  className="btn btn-danger my-1"
                                  onClick={() => clickDelete(contact.id)}
                                >
                                  <i className="fa fa-trash" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}
export default ContactList

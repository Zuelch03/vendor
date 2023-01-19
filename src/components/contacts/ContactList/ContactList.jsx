import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ContactService } from '../../../services/ContactService'
import Spinner from '../../Spinner/Spinner'

let ContactList = () => {
  let [state, setState] = useState({
    loading: false,
    contacts: [],
    errorMessage: '',
  })

  useEffect(() => {
    async function handleResp() {
      try {
        setState({ ...state, loading: true })
        let response = await ContactService.getAllContacts()
        setState({
          ...state,
          loading: false,
          contacts: response.data,
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

  let { loading, contacts, errorMessage } = state

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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. A
                  laudantium iste beatae ratione mollitia sed dolores explicabo,
                  dolorum aperiam molestiae, saepe eveniet eaque! Consequatur
                  eveniet quibusdam perspiciatis commodi at in.
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
                        type="text"
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
            {contacts.length > 0 &&
              contacts.map((contact) => {
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
                                <span className="fw-bold">
                                  jerickt@amazon.com
                                </span>
                              </li>
                              <li className="list-group-item list-group-item-action">
                                Category :{' '}
                                <span className="fw-bold">
                                  {contact.groupId}
                                </span>
                              </li>
                            </ul>
                          </div>
                          <div className="col-md-1 d-flex flex-column align-items-center">
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
                            <button className="btn btn-danger my-1">
                              <i className="fa fa-trash" />
                            </button>
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

/* @flow */

import React from "react"
import ReactDOM from "react-dom"
import LogCell from "../LogCell"
import * as Arr from "../../lib/Array"
import Columns from "../../models/Columns"
import type {Column} from "../../models/Columns"
import Log from "../../models/Log"
import * as Doc from "../../lib/Doc"
import * as columnWidths from "../../actions/columnWidths"
import type {Dispatch} from "../../reducers/types"
import {connect} from "react-redux"
import {getSelected} from "../../reducers/selectedColumns"
import {getColumns} from "../../selectors/columns"
import {getLogs} from "../../selectors/logs"
import type {State} from "../../reducers/types"
import dispatchToProps from "../../lib/dispatchToProps"

type StateProps = {|
  columns: Columns,
  selected: *,
  data: Log[]
|}

type DispatchProps = {|
  dispatch: Dispatch
|}

type Props = {|
  ...StateProps,
  ...DispatchProps
|}

export default class PhonyViewer extends React.Component<Props> {
  table: *

  shouldComponentUpdate(nextProps: Props) {
    return (
      this.props.selected !== nextProps.selected ||
      this.props.data !== nextProps.data
    )
  }

  componentDidMount() {
    this.measureColWidths()
  }

  componentDidUpdate() {
    this.measureColWidths()
  }

  measureColWidths() {
    let colWidths = {}
    if (this.table) {
      this.table.querySelectorAll("th").forEach(th => {
        colWidths[th.innerHTML] = th.getBoundingClientRect().width
      })
      this.props.dispatch(columnWidths.setWidths(colWidths))
    }
  }

  renderHeaderCell({name}: Column) {
    return <th key={name}>{name}</th>
  }

  renderCell(datum: Log, column: Column, index: number) {
    const field = datum.getField(column.name)
    if (field) {
      return (
        <td key={`${index}-${column.name}`}>
          <LogCell isScrolling={false} field={field} log={datum} />
        </td>
      )
    } else {
      return null
    }
  }

  render() {
    this.table = null
    const {columns, data} = this.props
    if (!columns.showHeader()) return null

    const cols = columns.getVisible()
    const headers = <tr>{cols.map(this.renderHeaderCell)}</tr>

    const renderRow = (datum, i) => (
      <tr key={i}>{cols.map(column => this.renderCell(datum, column, i))}</tr>
    )

    return ReactDOM.createPortal(
      <table className="phony-viewer" ref={r => (this.table = r)}>
        <thead>{headers}</thead>
        <tbody>{Arr.head(data, 10).map(renderRow)}</tbody>
      </table>,
      Doc.id("measure-layer")
    )
  }
}

const stateToProps = (state: State) => ({
  columns: getColumns(state),
  selected: getSelected(state),
  data: getLogs(state)
})

export const XPhonyViewer = connect<Props, {||}, _, _, _, _>(
  stateToProps,
  dispatchToProps
)(PhonyViewer)
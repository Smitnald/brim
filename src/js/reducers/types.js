/* @flow */

import {Client} from "boom-js-client"

import type {Analysis} from "./analysis"
import type {BoomdCredentials} from "./boomdCredentials"
import type {ColumnWidths} from "./columnWidths"
import type {CountByTime} from "./countByTime"
import type {Descriptors} from "./descriptors"
import type {FilterTree} from "./filterTree"
import type {LogDetails} from "./logDetails"
import type {LogViewer} from "./logViewer"
import type {Notifications} from "./notifications"
import type {SearchBar} from "./searchBar"
import type {SearchHistory} from "./searchHistory"
import type {SearchStats} from "./searchStats"
import type {SelectedColumns} from "./selectedColumns"
import type {Spaces} from "./spaces"
import type {TableColumnss} from "./tableColumns"
import type {TimeWindow} from "./timeWindow"
import type {TuplesByUid} from "./tuplesByUid"
import type {View} from "./view"
import type {Whois} from "./whois"

export type State = {
  analysis: Analysis,
  countByTime: CountByTime,
  searchBar: SearchBar,
  timeWindow: TimeWindow,
  spaces: Spaces,
  boomdCredentials: BoomdCredentials,
  logViewer: LogViewer,
  selectedColumns: SelectedColumns,
  columnWidths: ColumnWidths,
  searchStats: SearchStats,
  searchHistory: SearchHistory,
  whois: Whois,
  logDetails: LogDetails,
  tuplesByUid: TuplesByUid,
  filterTree: FilterTree,
  descriptors: Descriptors,
  view: View,
  notifications: Notifications,
  tableColumns: TableColumnss
}

export type Thunk = (Dispatch, () => State, Client) => *
export type Action = {type: string}
export type Dispatch = (Action | Thunk) => *
export type Api = Client
export type DispatchProps = {|dispatch: Dispatch|}

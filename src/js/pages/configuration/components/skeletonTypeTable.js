const SKELETON_TYPE_TABLE_TEMPLATE = `
<q-table
  title="Skeleton Types"
  :data="tableData"
  :columns="columnList"
  :pagination.sync="pagination"
  row-key="id"
>
  <template v-slot:header="props">
    <q-tr :props="props">
      <q-th auto-width></q-th>
      <q-th
        v-for="col in props.cols"
        :key="col.name"
        :props="props"
      >
        {{ col.label }}
      </q-th>
    </q-tr>
  </template>
  <template v-slot:body="props">
    <q-tr :props="props">
      <q-td auto-width>
        <q-btn
          size="sm"
          round
          dense
          @click="props.expand = !props.expand"
          :icon="props.expand ? 'expand_more' : 'chevron_right'"
        ></q-btn>
      </q-td>
      <q-td key="name" :props="props" style="font-size: 14px">
        {{ props.row.name }}
        <q-popup-edit
          auto-save
          v-model="props.row.name"
          title="Edit the type name"
          v-if="props.row.name !== 'default'"
          @save="saveTableData"
        >
          <q-input
            v-model="props.row.name"
            dense
            autofocus
            counter
            :rules="[ val => val.length != 0 || 'Please enter at least 1 character' ]"
          ></q-input>
        </q-popup-edit>
      </q-td>
      <q-td key="description" :props="props" style="font-size: 14px">
        <q-input
          v-model="props.row.description"
          borderless
          dense
          @input="saveTableData"
        ></q-input>
      </q-td>
      <q-td key="color" :props="props">
        <q-chip
          outline
          :style="{ 'border-color': props.row.color, 'color': props.row.color }"
        >
          {{ props.row.color.toUpperCase() }}
         </q-chip>
        <q-popup-edit
          auto-save
          v-model="props.row.color"
          title="Edit the type color"
          @save="saveTableData"
        >
          <q-color v-model="props.row.color"></q-color>
        </q-popup-edit>
      </q-td>
      <q-td key="nPoints" :props="props" style="font-size: 14px">
        {{ props.row.pointList.length }}
      </q-td>
      <q-td key="nEdges" :props="props" style="font-size: 14px">
        {{ props.row.edgeList.length }}
      </q-td>
      <q-td key="delete" :props="props">
        <q-btn
          icon="delete"
          color="negative"
          flat
          dense
          style="width: 100%"
          :disabled="props.row.name === 'default'"
          @click="handleDelete(props)"
        ></q-btn>
      </q-td>
    </q-tr>
    <q-tr v-show="props.expand" :props="props">
      <q-td colspan="100%" style="white-space: normal;">
        <q-table
          flat
          dense
          title="Points"
          :data="props.row.pointList"
          :columns="[
            { name: 'name', align: 'center', label: 'name', field: 'name' },
            { name: 'x', align: 'left', label: 'x', field: 'x' },
            { name: 'y', align: 'left', label: 'y', field: 'y' },
            { name: 'delete', align: 'center', label: 'delete', field: 'delete' },
          ]"
          :pagination.sync="pagination"
          row-key="id"
        >
          <template v-slot:body="pointProps">
            <q-tr :props="pointProps">
              <q-td key="name" :props="pointProps" style="font-size: 14px">
                {{ pointProps.row.name }}
                <q-popup-edit
                  auto-save
                  v-model="pointProps.row.name"
                  title="Edit the point name"
                  @save="saveTableData"
                >
                  <q-input
                    v-model="pointProps.row.name"
                    dense
                    autofocus
                    counter
                    :rules="[ val => val.length != 0 || 'Please enter at least 1 character' ]"
                  ></q-input>
                </q-popup-edit>
              </q-td>
              <q-td key="x" :props="pointProps" style="font-size: 14px">
                <q-input
                  v-model.number="pointProps.row.x"
                  borderless
                  dense
                  @input="saveTableData"
                ></q-input>
              </q-td>
              <q-td key="y" :props="pointProps" style="font-size: 14px">
                <q-input
                  v-model.number="pointProps.row.y"
                  borderless
                  dense
                  @input="saveTableData"
                ></q-input>
              </q-td>
              <q-td key="delete" :props="pointProps">
                <q-btn
                  icon="delete"
                  color="negative"
                  flat
                  dense
                  style="width: 100%"
                  @click="handleDeletePoint(props, pointProps)"
                ></q-btn>
              </q-td>
            </q-tr>
          </template>
          <template v-slot:bottom>
            <q-btn
              icon="add"
              color="primary"
              flat
              dense
              style="margin: 0 auto; width: 100%"
              @click="handleAddPoint(props)"
            ></q-btn>
          </template>
        </q-table>

        <q-table
          flat
          dense
          title="Edges"
          :data="props.row.edgeList"
          :columns="[
            { name: 'from', align: 'left', label: 'from', field: 'from' },
            { name: 'to', align: 'left', label: 'to', field: 'to' },
            { name: 'delete', align: 'center', label: 'delete', field: 'delete' },
          ]"
          :pagination.sync="pagination"
          row-key="id"
        >
          <template v-slot:body="edgeProps">
            <q-tr :props="edgeProps">
              <q-td key="from" :props="edgeProps" style="font-size: 14px">
                <q-input
                  v-model.number="edgeProps.row.from"
                  borderless
                  dense
                  @input="saveTableData"
                ></q-input>
              </q-td>
              <q-td key="to" :props="edgeProps" style="font-size: 14px">
                <q-input
                  v-model.number="edgeProps.row.to"
                  borderless
                  dense
                  @input="saveTableData"
                ></q-input>
              </q-td>
              <q-td key="delete" :props="edgeProps">
                <q-btn
                  icon="delete"
                  color="negative"
                  flat
                  dense
                  style="width: 100%"
                  @click="handleDeleteEdge(props, edgeProps)"
                ></q-btn>
              </q-td>
            </q-tr>
          </template>
          <template v-slot:bottom>
            <q-btn
              icon="add"
              color="primary"
              flat
              dense
              style="margin: 0 auto; width: 100%"
              @click="handleAddEdge(props)"
            ></q-btn>
          </template>
        </q-table>
      </q-td>
    </q-tr>
  </template>
  <template v-slot:bottom>
    <q-btn
      icon="add"
      color="primary"
      flat
      dense
      style="margin: 0 auto; width: 100%"
      @click="handleAdd()"
    ></q-btn>
  </template>
</q-table>
`

const columnList = [
  { name: 'name', align: 'center', label: 'name', field: 'name' },
  { name: 'description', align: 'center', label: 'description', field: 'description' },
  { name: 'color', align: 'center', label: 'color', field: 'color', style: 'width: 120px' },
  { name: 'nPoints', align: 'center', label: '#points', field: 'nPoints' },
  { name: 'nEdges', align: 'center', label: '#edges', field: 'nEdges' },
  { name: 'delete', align: 'center', label: 'delete', field: 'delete' },
]

import utils from '../../../libs/utils.js'

export default {
  data: () => {
    return {
      columnList,
      pagination: { rowsPerPage: 0 },
    }
  },
  methods: {
    saveTableData () {
      this.$store.commit('setSkeletonTypeData', this.tableData)
    },
    handleDelete (props) {
      utils.confirm(
        'Are you sure to delete type ' + props.row.name + ' ?',
      ).onOk(() => {
        this.tableData.splice(this.tableData.findIndex(type => type.id === props.key), 1)
        this.saveTableData()
      })
    },
    handleAdd () {
      let lastId = this.tableData[this.tableData.length - 1].id
      this.tableData.push({
        id: lastId + 1,
        name: 'new',
        description: '',
        color: utils.randomColor(),
        pointList: [],
        edgeList: [],
      })
      this.saveTableData()
    },
    handleDeletePoint (props, pointProps) {
      utils.confirm(
        'Are you sure to delete point ' + pointProps.row.name + ' ?',
      ).onOk(() => {
        const pointList = props.row.pointList
        pointList.splice(pointList.findIndex(point => point.id === pointProps.key), 1)
        this.saveTableData()
      })
    },
    handleAddPoint (props) {
      const pointList = props.row.pointList
      let lastId = pointList.length ? pointList[pointList.length - 1].id : -1
      pointList.push({
        id: lastId + 1,
        name: 'new',
        x: 0,
        y: 0,
      })
      this.saveTableData()
    },
    handleDeleteEdge (props, edgeProps) {
      utils.confirm(
        'Are you sure to delete edge from ' + edgeProps.row.from + ' to ' + edgeProps.row.to + ' ?',
      ).onOk(() => {
        const edgeList = props.row.edgeList
        edgeList.splice(edgeList.findIndex(edge => edge.id === edgeProps.key), 1)
        this.saveTableData()
      })
    },
    handleAddEdge (props) {
      const edgeList = props.row.edgeList
      console.log(edgeList, edgeList.length)
      let lastId = edgeList.length ? edgeList[edgeList.length - 1].id : -1
      console.log(lastId)
      edgeList.push({
        id: lastId + 1,
        x: 0,
        y: 0,
      })
      this.saveTableData()
    },
  },
  computed: {
    tableData () {
      return this.$store.state.settings.skeletonTypeData
    },
  },
  template: SKELETON_TYPE_TABLE_TEMPLATE,
}
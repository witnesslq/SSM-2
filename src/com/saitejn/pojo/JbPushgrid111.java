package com.saitejn.pojo;

public class JbPushgrid111 {
    private Integer 序号;

    private Double 吨氨综合消耗变化;

    private Integer 变量控制类型;

    private Integer 班次;
    private String 审核情况;
    public String get审核情况() {
        return 审核情况;
    }

    public void set审核情况(String 审核情况) {
        this.审核情况 = 审核情况 == null ? null : 审核情况.trim();
    }

    public Integer get序号() {
        return 序号;
    }

    public void set序号(Integer 序号) {
        this.序号 = 序号;
    }

    public Double get吨氨综合消耗变化() {
        return 吨氨综合消耗变化;
    }

    public void set吨氨综合消耗变化(Double 吨氨综合消耗变化) {
        this.吨氨综合消耗变化 = 吨氨综合消耗变化;
    }

    public Integer get变量控制类型() {
        return 变量控制类型;
    }

    public void set变量控制类型(Integer 变量控制类型) {
        this.变量控制类型 = 变量控制类型;
    }

    public Integer get班次() {
        return 班次;
    }

    public void set班次(Integer 班次) {
        this.班次 = 班次;
    }
}